# IPFS Migration Guide

## Overview

This document outlines the migration from Iagon storage to IPFS (InterPlanetary File System) for image storage in Nature Dopes 2.0.

## Why IPFS?

### Benefits
- **No Authentication Required**: Public reads don't need API keys or passwords
- **Content-Addressed**: Files identified by cryptographic hash (CID) - immutable and verifiable
- **Decentralized**: Content can be served from multiple nodes/gateways
- **Cost-Effective**: Multiple free pinning services available
- **Simple Integration**: Direct URL access to images via public gateways

### Current vs IPFS Architecture

**Current (Iagon):**
```
Database: image_path = "66a7900d2aec89479de9d96c"
Fetch: POST to Iagon API with x-api-key + password
Return: Base64 encoded image
```

**IPFS:**
```
Database: image_path = "QmX7j8K9bN3pQ..." (IPFS CID)
Fetch: GET from public gateway (no auth needed)
Return: Direct image or base64 encoded
```

## Recommended IPFS Pinning Services

### 1. Pinata (Recommended)
- **Free Tier**: 1GB storage, unlimited bandwidth
- **API**: Simple REST API for uploads
- **Dashboard**: Web UI for managing pins
- **Gateway**: Fast CDN-backed gateway
- **Signup**: https://pinata.cloud

### 2. Web3.Storage
- **Free Tier**: Unlimited storage (backed by Protocol Labs)
- **API**: JavaScript client library available
- **Focus**: Public good data
- **Signup**: https://web3.storage

### 3. NFT.Storage
- **Free Tier**: Unlimited for NFT/public data
- **API**: Similar to Web3.Storage
- **Filecoin**: Automatic Filecoin archival
- **Signup**: https://nft.storage

### 4. Filebase
- **Free Tier**: 5GB storage, 1GB egress/month
- **S3-Compatible**: Can use AWS SDK
- **Multi-chain**: IPFS + other networks
- **Signup**: https://filebase.com

## Implementation Plan

### Phase 1: Setup Pinning Service

1. **Sign up for Pinata** (or preferred service)
2. **Generate API Key**:
   - Go to API Keys section in dashboard
   - Create new key with pinning permissions
   - Save JWT token securely

3. **Add to .env**:
   ```bash
   PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   PINATA_GATEWAY=https://gateway.pinata.cloud
   ```

### Phase 2: Update Upload Functionality

**Current File**: `src/app/[locale]/map/_lib/uploadImageIagon.ts`

**Create New File**: `src/app/[locale]/map/_lib/uploadImageIPFS.ts`

```typescript
'use server'

export async function uploadImageIPFS(formData: FormData) {
  const file = formData.get('file') as File

  if (!file) {
    return { error: 'No file provided' }
  }

  try {
    // Create FormData for Pinata
    const data = new FormData()
    data.append('file', file)

    // Optional: Add metadata
    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        uploadedBy: 'nature-dopes',
        uploadDate: new Date().toISOString()
      }
    })
    data.append('pinataMetadata', metadata)

    // Upload to Pinata
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_JWT}`
      },
      body: data
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const result = await response.json()

    // Return the IPFS CID (Content Identifier)
    return {
      success: true,
      cid: result.IpfsHash, // This is the CID to store in database
      url: `${process.env.PINATA_GATEWAY}/ipfs/${result.IpfsHash}`
    }

  } catch (error) {
    console.error('IPFS upload error:', error)
    return { error: 'Failed to upload to IPFS' }
  }
}
```

### Phase 3: Update Image Retrieval

**Current File**: `src/app/[locale]/map/_lib/GetImage.ts`

**Option A: Simple Gateway URL (Recommended)**

Update components to use IPFS gateway URLs directly:

```typescript
// In your map/gallery components
<img
  src={`https://gateway.pinata.cloud/ipfs/${image.image_path}`}
  alt={image.species_name}
/>
```

**Option B: Keep GetImage Function (for consistency)**

```typescript
'use server'

export async function GetImage(cid: string) {
  const gateway = process.env.PINATA_GATEWAY || 'https://ipfs.io'

  try {
    const res = await fetch(`${gateway}/ipfs/${cid}`, {
      cache: 'force-cache', // Cache images aggressively
      next: { revalidate: 86400 } // Revalidate daily
    })

    if (res.status !== 200) {
      return {
        error: 'Problem retrieving image from IPFS'
      }
    }

    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString('base64')

    return {
      i64: base64
    }

  } catch (error) {
    console.error('IPFS fetch error:', error)
    return {
      error: 'Technical issue retrieving image'
    }
  }
}
```

### Phase 4: Update Database Schema (No Changes Needed!)

The existing schema works perfectly:

```prisma
model images {
  id           Int    @id @default(autoincrement())
  species_name String @db.VarChar(100)
  gps_long     Float  @db.Real
  gps_lat      Float  @db.Real
  image_path   String @db.VarChar(200)  // Store IPFS CID here
  user_id      Int
}
```

**Note**: IPFS CIDs (v0) are typically 46 characters, CIDv1 can be longer. Current `VarChar(200)` is sufficient.

### Phase 5: Update Upload Form

**File**: `src/app/[locale]/map/_components/forms/ImageUploadForm.tsx`

1. Update import:
   ```typescript
   import { uploadImageIPFS } from '../../_lib/uploadImageIPFS'
   ```

2. Update form submission handler:
   ```typescript
   const handleSubmit = async (formData: FormData) => {
     // Upload to IPFS
     const uploadResult = await uploadImageIPFS(formData)

     if (uploadResult.error) {
       setError(uploadResult.error)
       return
     }

     // Register in database with CID as image_path
     await registerImageData({
       species_name: formData.get('species_name'),
       gps_lat: formData.get('gps_lat'),
       gps_long: formData.get('gps_long'),
       image_path: uploadResult.cid, // Store the CID
       user_id: session.user.id
     })
   }
   ```

## Migration Strategy for Existing Images

### Option 1: Gradual Migration (Recommended)
- Keep existing Iagon images as-is
- New uploads go to IPFS
- Update `GetImage.ts` to detect path type:

```typescript
export async function GetImage(path: string) {
  // Check if it's an IPFS CID (starts with Qm for CIDv0 or b for CIDv1)
  const isIPFS = path.startsWith('Qm') || path.startsWith('b')

  if (isIPFS) {
    // Fetch from IPFS
    return fetchFromIPFS(path)
  } else {
    // Fetch from Iagon (legacy)
    return fetchFromIagon(path)
  }
}
```

### Option 2: Full Migration
1. Export all images from Iagon
2. Upload to IPFS via script
3. Update database with new CIDs
4. Remove Iagon dependencies

## Public Gateway Options

You can use multiple gateways for redundancy:

```typescript
const IPFS_GATEWAYS = [
  'https://gateway.pinata.cloud',
  'https://ipfs.io',
  'https://cloudflare-ipfs.com',
  'https://dweb.link'
]

// Fallback logic if one gateway fails
async function fetchFromIPFS(cid: string) {
  for (const gateway of IPFS_GATEWAYS) {
    try {
      const res = await fetch(`${gateway}/ipfs/${cid}`)
      if (res.ok) return res
    } catch (e) {
      continue // Try next gateway
    }
  }
  throw new Error('All IPFS gateways failed')
}
```

## Performance Considerations

### Caching
- Use Next.js cache settings: `cache: 'force-cache'`
- Set revalidation periods: `next: { revalidate: 86400 }`
- IPFS content is immutable - safe to cache indefinitely

### CDN
- Pinata includes built-in CDN
- Consider Cloudflare for additional caching layer
- Use `gateway.pinata.cloud` for fastest access (if using Pinata)

### Image Optimization
- Continue using Next.js `<Image>` component
- Consider storing multiple resolutions on IPFS
- Use Sharp for server-side resizing before upload

## Cost Comparison

| Service | Storage Cost | Bandwidth Cost | Current (Iagon) |
|---------|--------------|----------------|-----------------|
| Pinata Free | 1GB | Unlimited | Unknown |
| Web3.Storage | Unlimited | Unlimited | Unknown |
| NFT.Storage | Unlimited | Unlimited | Unknown |
| Filebase Free | 5GB | 1GB/mo | Unknown |

## Security Considerations

1. **Public Content**: All IPFS content is public by default
   - Don't upload sensitive images
   - Consider this acceptable for nature photos

2. **Content Permanence**:
   - IPFS content is permanent if pinned
   - Unpinning removes from your node but may exist elsewhere
   - Plan data retention policy

3. **API Keys**:
   - Store Pinata JWT in `.env` (never commit)
   - Use server actions for uploads (never expose JWT to client)

## Testing Checklist

- [ ] Sign up for Pinata account
- [ ] Generate API key and add to `.env`
- [ ] Test upload with sample image
- [ ] Verify CID returned correctly
- [ ] Test image retrieval via gateway URL
- [ ] Update upload form to use IPFS
- [ ] Test full upload flow (form → IPFS → database)
- [ ] Test image display in map/gallery
- [ ] Verify caching behavior
- [ ] Test with multiple image formats (JPG, PNG, WebP)

## Rollback Plan

If issues arise:
1. Keep old `uploadImageIagon.ts` file
2. Use feature flag in `.env`:
   ```bash
   USE_IPFS=false
   ```
3. Conditional logic in upload handler:
   ```typescript
   const uploadFn = process.env.USE_IPFS === 'true'
     ? uploadImageIPFS
     : uploadImageIagon
   ```

## Resources

- **IPFS Docs**: https://docs.ipfs.tech
- **Pinata Docs**: https://docs.pinata.cloud
- **Web3.Storage Docs**: https://web3.storage/docs
- **IPFS Public Gateways**: https://ipfs.github.io/public-gateway-checker/

## Next Steps

1. Review this document
2. Choose pinning service (recommend Pinata)
3. Set up account and API keys
4. Implement Phase 1-3 in development
5. Test thoroughly with sample images
6. Deploy to production
7. Monitor performance and costs

## Questions to Consider

- Do we want to migrate existing Iagon images to IPFS?
- Should we run our own IPFS node for faster access?
- Do we need image moderation before IPFS upload (content is permanent)?
- What's our backup strategy if pinning service goes down?

- 29-11-25 updated

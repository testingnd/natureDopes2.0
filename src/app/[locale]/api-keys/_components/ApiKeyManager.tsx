"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Text,
  TextField,
  Heading,
  Badge,
  IconButton,
  Dialog,
  Code,
  Callout,
  Table,
} from "@radix-ui/themes";
import {
  CopyIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

type ApiKey = {
  id: number;
  key: string;
  name: string;
  created_at: string;
  expires_at: string;
  last_used: string | null;
  revoked: boolean;
  created_ip?: string;
};

export default function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyName, setKeyName] = useState("");
  const [generating, setGenerating] = useState(false);
  const [newKey, setNewKey] = useState<ApiKey | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  // Fetch all API keys
  const fetchApiKeys = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/keys`);
      if (!response.ok) {
        throw new Error("Failed to fetch API keys");
      }
      const data = await response.json();
      setApiKeys(data || []);
      setError(null);
    } catch (err) {
      setError("Unable to load API keys. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Generate new API key
  const generateApiKey = async () => {
    if (!keyName.trim()) {
      setError("Please enter a name for your API key");
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/keys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: keyName }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate API key");
      }

      const data = await response.json();
      setNewKey(data);
      setKeyName("");
      fetchApiKeys(); // Refresh the list
    } catch (err) {
      setError("Unable to generate API key. Please try again.");
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  // Revoke API key
  const revokeApiKey = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/keys/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to revoke API key");
      }

      fetchApiKeys(); // Refresh the list
    } catch (err) {
      setError("Unable to revoke API key. Please try again.");
      console.error(err);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(keyId);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Check if key is expired
  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return (
    <Box>
      {/* Error Message */}
      {error && (
        <Callout.Root color="red" mb="4">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      {/* New Key Success Dialog */}
      <Dialog.Root open={!!newKey} onOpenChange={() => setNewKey(null)}>
        <Dialog.Content style={{ maxWidth: 600 }}>
          <Dialog.Title>API Key Generated Successfully!</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            <strong>Important:</strong> Copy your API key now. You won't be able to see it again!
          </Dialog.Description>

          <Box mb="4">
            <Text size="2" weight="bold" mb="2">
              Key Name:
            </Text>
            <Text size="2" color="gray">
              {newKey?.name}
            </Text>
          </Box>

          <Box mb="4">
            <Text size="2" weight="bold" mb="2">
              API Key:
            </Text>
            <Flex gap="2" align="center">
              <Code style={{ flex: 1, padding: "8px", fontSize: "12px", overflowX: "auto" }}>
                {newKey?.key}
              </Code>
              <IconButton
                variant="soft"
                onClick={() => newKey && copyToClipboard(newKey.key, "new-key")}
              >
                {copiedKey === "new-key" ? <CheckIcon /> : <CopyIcon />}
              </IconButton>
            </Flex>
          </Box>

          <Box mb="4">
            <Text size="2" color="gray">
              Expires: {newKey && formatDate(newKey.expires_at)} (90 days)
            </Text>
          </Box>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Close
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      {/* Generate New Key Section */}
      <Card mb="6">
        <Heading size="5" mb="4">
          Generate New API Key
        </Heading>
        <Flex gap="3" align="end">
          <Box style={{ flex: 1 }}>
            <Text size="2" weight="bold" mb="1">
              Key Name
            </Text>
            <TextField.Root
              placeholder="e.g., My Flora Research Project"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              disabled={generating}
            />
          </Box>
          <Button onClick={generateApiKey} disabled={generating || !keyName.trim()}>
            {generating ? "Generating..." : "Generate Key"}
          </Button>
        </Flex>
        <Text size="1" color="gray" mt="2">
          Rate limit: 100 requests/hour per key • Keys expire after 90 days
        </Text>
      </Card>

      {/* API Keys List */}
      <Card>
        <Heading size="5" mb="4">
          Your API Keys
        </Heading>

        {loading ? (
          <Text>Loading...</Text>
        ) : apiKeys.length === 0 ? (
          <Text color="gray">No API keys yet. Generate one above to get started!</Text>
        ) : (
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Key</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Expires</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Last Used</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {apiKeys.map((key) => (
                <Table.Row key={key.id}>
                  <Table.Cell>
                    <Text weight="bold">{key.name}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap="2" align="center">
                      <Code style={{ fontSize: "11px" }}>
                        {key.key.substring(0, 16)}...
                      </Code>
                      <IconButton
                        size="1"
                        variant="ghost"
                        onClick={() => copyToClipboard(key.key, key.id.toString())}
                      >
                        {copiedKey === key.id.toString() ? (
                          <CheckIcon />
                        ) : (
                          <CopyIcon />
                        )}
                      </IconButton>
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>
                    {key.revoked ? (
                      <Badge color="red">Revoked</Badge>
                    ) : isExpired(key.expires_at) ? (
                      <Badge color="orange">Expired</Badge>
                    ) : (
                      <Badge color="green">Active</Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">{formatDate(key.created_at)}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">{formatDate(key.expires_at)}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">
                      {key.last_used ? formatDate(key.last_used) : "Never"}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    {!key.revoked && (
                      <IconButton
                        size="1"
                        variant="ghost"
                        color="red"
                        onClick={() => revokeApiKey(key.id)}
                      >
                        <TrashIcon />
                      </IconButton>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Card>

      {/* Usage Information */}
      <Card mt="6">
        <Heading size="4" mb="3">
          How to Use Your API Key
        </Heading>
        <Text size="2" mb="3">
          Include your API key in the <Code>X-API-Key</Code> header when making requests:
        </Text>
        <Code
          style={{
            display: "block",
            padding: "12px",
            fontSize: "12px",
            whiteSpace: "pre-wrap",
          }}
        >
          {`curl ${API_BASE_URL}/images \\
  -H "X-API-Key: your-api-key-here"`}
        </Code>
      </Card>
    </Box>
  );
}

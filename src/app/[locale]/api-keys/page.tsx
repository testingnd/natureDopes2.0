import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/authOptions";
import { redirect } from "next/navigation";
import { Container, Heading, Text, Section } from "@radix-ui/themes";
import ApiKeyManager from "./_components/ApiKeyManager";
import { getTranslations } from "next-intl/server";

export default async function ApiKeysPage() {
  // Check for authentication
  const session = await getServerSession(authOptions);

  // Redirect if not authenticated
  if (!session) {
    redirect("/signin");
  }

  const t = await getTranslations("ApiKeys");

  return (
    <Container size="3" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      <Section>
        <Heading size="8" mb="2">
          {t("title")}
        </Heading>
        <Text size="3" color="gray" mb="6">
          {t("description")}
        </Text>

        <ApiKeyManager />
      </Section>
    </Container>
  );
}

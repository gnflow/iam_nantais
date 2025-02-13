import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";
import { getHost } from "@/utils/getHost";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: Promise<{
    page: string[];
  }>;
}

export default async function Page(props: PageProps) {
  const builderModelName = "page";
  // Générer l'URL de preview dynamique
  const previewUrl = `https://${getHost()}/${builderModelName}?builder.preview=true`;

  console.log("Preview URL pour Builder.io :", previewUrl);

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + ((await props?.params)?.page?.join("/") || ""),
      },
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Ajout d'une condition pour afficher le Preview URL en mode dev */}
      {process.env.NODE_ENV !== "production" && (
        <p style={{ textAlign: "center", fontSize: "12px", color: "#999" }}>
          Preview: <a href={previewUrl} target="_blank">{previewUrl}</a>
        </p>
      )}

      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={builderModelName} />
    </>
  );
}

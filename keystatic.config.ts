import { config, fields, singleton } from "@keystatic/core";

// https://keystatic.com/docs/local-mode
// Set storage mode: "local" or "github"
let KEYSTATIC_STORAGE_MODE = "local";

// GitHub repository details (required for GitHub mode)
const GITHUB_REPO_OWNER = "REPO_OWNER";
const GITHUB_REPO_NAME = "REPO_NAME";

export default config({
  storage:
    (KEYSTATIC_STORAGE_MODE as "github") === "github"
      ? {
          kind: "github",
          repo: `${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`,
        }
      : {
          kind: "local",
        },

  singletons: {
    navbar: singleton({
      label: "Navigation",
      path: "src/data/navbar",
      format: { data: "json" },
      schema: {
        logoHighlightedText: fields.text({
          label: "Texte mis en évidence",
          defaultValue: "GM",
        }),
        logoText: fields.text({
          label: "Texte du logo",
          defaultValue: "TEC",
        }),
        homeLink: fields.object({
          label: fields.text({
            label: "Libellé du lien d'accueil",
            defaultValue: "Home",
          }),
          href: fields.text({
            label: "URL du lien d'accueil",
            defaultValue: "/",
          }),
        }),
        navigationLinks: fields.array(
          fields.object({
            label: fields.text({ label: "Libellé" }),
            href: fields.text({ label: "URL" }),
          }),
          {
            label: "Liens de navigation",
          },
        ),
      },
    }),
  },

  collections: {},
});

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
          label: "Logo highlighted text",
          defaultValue: "GM",
        }),
        logoText: fields.text({
          label: "Logo text",
          defaultValue: "TEC",
        }),
        homeLink: fields.object({
          label: fields.text({
            label: "Home link label",
            defaultValue: "Home",
          }),
          href: fields.text({
            label: "Home link URL",
            defaultValue: "/",
          }),
        }),
        navigationLinks: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.text({ label: "URL" }),
          }),
          {
            label: "Navigation links",
          },
        ),
      },
    }),
    footer: singleton({
      label: "Footer",
      path: "src/data/footer",
      format: { data: "json" },
      schema: {
        companyInfo: fields.object({
          name: fields.text({
            label: "Company name",
            defaultValue: "GMTEC Group",
          }),
          description: fields.text({
            label: "Company description",
            defaultValue:
              "GMTEC Group is a consulting company providing expertise in the Automotive sector since 2003.",
          }),
        }),
        quickLinks: fields.object({
          title: fields.text({
            label: "Section title",
            defaultValue: "Quick Links",
          }),
          links: fields.array(
            fields.object({
              label: fields.text({ label: "Label" }),
              href: fields.text({ label: "URL" }),
            }),
            {
              label: "Quick links",
            },
          ),
        }),
        contactInfo: fields.object({
          address: fields.text({
            label: "Address",
            defaultValue: "France & Italy",
          }),
        }),
        copyright: fields.object({
          companyName: fields.text({
            label: "Company name for copyright",
            defaultValue: "GMTEC Group",
          }),
          craftedBy: fields.object({
            name: fields.text({
              label: "Creator name",
              defaultValue: "valentin berceaux",
            }),
            email: fields.text({
              label: "Creator email",
              defaultValue: "v.berceaux@gmail.com",
            }),
          }),
        }),
      },
    }),
    hero: singleton({
      label: "Hero Section",
      path: "src/data/hero",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Main title",
          defaultValue: "Expertise in automotive consulting since 2003"
        }),
        subtitle: fields.text({
          label: "Subtitle/Description",
          defaultValue: "We have been committed and focused, supporting our Principals mainly in the French and Italian markets, facilitating the growth of their Sales."
        }),
        primaryCTA: fields.object({
          text: fields.text({ 
            label: "Primary button text",
            defaultValue: "Contact us"
          }),
          href: fields.text({ 
            label: "Primary button URL",
            defaultValue: "/contact"
          }),
        }),
        secondaryCTA: fields.object({
          text: fields.text({ 
            label: "Secondary button text",
            defaultValue: "Learn about our mission"
          }),
          href: fields.text({ 
            label: "Secondary button URL",
            defaultValue: "/about"
          }),
        }),
        image: fields.object({
          src: fields.image({
            label: "Hero image",
            directory: "src/assets/images",
            publicPath: "@images/",
          }),
          alt: fields.text({ 
            label: "Image alt text",
            defaultValue: "GMTEC Group"
          }),
        }),
      },
    }),
  },

  collections: {},
});

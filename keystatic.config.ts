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
    // ========== GLOBAL COMPONENTS ==========
    navbar: singleton({
      label: "Navigation Bar",
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

    // ========== HOME PAGE ==========
    homeHero: singleton({
      label: "Home - Hero Section",
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
    homeFeatures: singleton({
      label: "Home - Features Section",
      path: "src/data/featureShowcase",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Section title",
          defaultValue: "Who we are"
        }),
        subtitle: fields.text({
          label: "Section description",
          multiline: true,
          defaultValue: "We've been active in the automotive sector for over 20 years. Our cross-disciplinary team provides flexible support for both our principals and end customers, in a wide range of areas including sales, engineering, logistics and quality. By offering agile and flexible solutions for business development, our mission is to strengthen the Automotive Supplier's presence in the field and increase the success chances for all the existing opportunities."
        }),
        features: fields.array(
          fields.object({
            title: fields.text({ label: "Feature title" }),
            description: fields.text({ 
              label: "Feature description",
              multiline: true
            }),
            image: fields.conditional(
              fields.checkbox({ label: "Has image?" }),
              {
                true: fields.object({
                  src: fields.image({
                    label: "Feature image",
                    directory: "src/assets/images",
                    publicPath: "@images/",
                  }),
                  alt: fields.text({ 
                    label: "Image alt text",
                    defaultValue: ""
                  }),
                }),
                false: fields.empty(),
              }
            ),
            additionalItems: fields.conditional(
              fields.checkbox({ label: "Has additional list items?" }),
              {
                true: fields.array(
                  fields.text({ label: "List item" }),
                  {
                    label: "Additional features",
                  }
                ),
                false: fields.empty(),
              }
            ),
          }),
          {
            label: "Features",
          }
        ),
      },
    }),
    homeBento: singleton({
      label: "Home - Mission Section",
      path: "src/data/featureBento",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Section title",
          defaultValue: "Our mission"
        }),
        subtitle: fields.text({
          label: "Section description",
          multiline: true,
          defaultValue: "We offer tailor-made Business Development support in the Automotive OE (Original Equipment) sector, adapting ourselves to the needs of our partners."
        }),
        localExpertise: fields.object({
          title: fields.text({ 
            label: "Title",
            defaultValue: "Local Expertise"
          }),
          description: fields.text({ 
            label: "Description",
            multiline: true,
            defaultValue: "Deep market knowledge in France, Italy, Benelux and Spain with on-the-ground presence and cultural understanding"
          }),
          image: fields.object({
            src: fields.image({
              label: "Image",
              directory: "src/assets/images",
              publicPath: "@images/",
            }),
            alt: fields.text({ 
              label: "Image alt text",
              defaultValue: "Local Expertise"
            }),
          }),
        }),
        projectManagement: fields.object({
          title: fields.text({ 
            label: "Title",
            defaultValue: "Complete Project Management"
          }),
          description: fields.text({ 
            label: "Description",
            multiline: true,
            defaultValue: "From project award to <span class=\"font-bold\">SOP</span> (Start of Production), we provide comprehensive program management throughout the development phase and series production."
          }),
          image: fields.object({
            src: fields.image({
              label: "Image",
              directory: "src/assets/images",
              publicPath: "@images/",
            }),
            alt: fields.text({ 
              label: "Image alt text",
              defaultValue: "Project Management"
            }),
          }),
        }),
        agileResponse: fields.object({
          title: fields.text({ 
            label: "Title",
            defaultValue: "Agile Response"
          }),
          description: fields.text({ 
            label: "Description",
            multiline: true,
            defaultValue: "We intervene effectively in the event of engineering modifications, technical obstacles, quality or logistics issues. Our lean structure ensures rapid adaptation."
          }),
          image: fields.object({
            src: fields.image({
              label: "Image",
              directory: "src/assets/images",
              publicPath: "@images/",
            }),
            alt: fields.text({ 
              label: "Image alt text",
              defaultValue: "Agile Response"
            }),
          }),
        }),
        beyondSales: fields.object({
          title: fields.text({ 
            label: "Title",
            defaultValue: "Beyond Sales Support"
          }),
          listItems: fields.array(
            fields.text({ label: "List item" }),
            {
              label: "Support items",
            }
          ),
          image: fields.object({
            src: fields.image({
              label: "Image",
              directory: "src/assets/images",
              publicPath: "@images/",
            }),
            alt: fields.text({ 
              label: "Image alt text",
              defaultValue: "Beyond Sales Support"
            }),
          }),
        }),
      },
    }),
    homeStrategy: singleton({
      label: "Home - Strategy Section",
      path: "src/data/featureAnimated",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Section title",
          defaultValue: "Our Strategic Approach"
        }),
        subtitle: fields.text({
          label: "Section description",
          multiline: true,
          defaultValue: "Agile and responsive, we are constantly adapting thanks to our lean organizational structure and the versatility of our team. Our role goes far beyond simply supporting suppliers' sales teams - we actively contribute to development at every stage."
        }),
        ctaButton: fields.object({
          text: fields.text({ 
            label: "Button text",
            defaultValue: "Learn More"
          }),
          href: fields.text({ 
            label: "Button URL",
            defaultValue: "/about"
          }),
        }),
        features: fields.object({
          identify: fields.text({ 
            label: "Identify feature description",
            multiline: true,
            defaultValue: "Identify opportunities and qualify potential partners in target markets."
          }),
          develop: fields.text({ 
            label: "Develop feature description",
            multiline: true,
            defaultValue: "Develop tailored strategies and manage complex automotive projects."
          }),
          transform: fields.text({ 
            label: "Transform feature description",
            multiline: true,
            defaultValue: "Transform partnerships into sustainable business growth and success."
          }),
        }),
      },
    }),
    homeVision: singleton({
      label: "Home - Vision Section",
      path: "src/data/featureGrid",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Section title",
          defaultValue: "Our vision"
        }),
        subtitle: fields.text({
          label: "Section description",
          multiline: true,
          defaultValue: "To empower our core business within the automotive OE sector, we have been diversifying our activities for around five years with strategic initiatives. Our ambition: to become the most efficient and reliable local partner for suppliers to the automotive, agricultural and industrial sectors, with a presence that extends well beyond the European market."
        }),
        features: fields.object({
          rnd: fields.object({
            heading: fields.text({ 
              label: "R&D heading",
              defaultValue: "Advanced R&D Activities"
            }),
            description: fields.text({ 
              label: "R&D description",
              multiline: true,
              defaultValue: "Launching new activities in advanced R&D, continuously learning on new technologies, new regulations and new market tendencies to stay at the forefront of automotive innovation."
            }),
          }),
          multiSector: fields.object({
            heading: fields.text({ 
              label: "Multi-sector heading",
              defaultValue: "Multi-Sector Expertise"
            }),
            description: fields.text({ 
              label: "Multi-sector description",
              multiline: true,
              defaultValue: "Promotion of technologies not limited to the OE Automotive sector, but also for systems and components in the Agricultural, Industrial and Independent Aftermarket (IAM) areas."
            }),
          }),
          expansion: fields.object({
            heading: fields.text({ 
              label: "Expansion heading",
              defaultValue: "Global Expansion"
            }),
            description: fields.text({ 
              label: "Expansion description",
              multiline: true,
              defaultValue: "Enlarge our presence in EMEA and in new Continents via opening of new offices or via partnerships, extending our reach to serve clients worldwide."
            }),
          }),
        }),
      },
    }),
    homeCTA: singleton({
      label: "Home - Call to Action",
      path: "src/data/cta",
      format: { data: "json" },
      schema: {
        title: fields.object({
          firstLine: fields.text({
            label: "First line of title",
            defaultValue: "Ready to accelerate your growth?"
          }),
          secondLine: fields.text({
            label: "Second line (before company name)",
            defaultValue: "Partner with"
          }),
          companyName: fields.object({
            highlighted: fields.text({
              label: "Company name highlighted part",
              defaultValue: "GM"
            }),
            normal: fields.text({
              label: "Company name normal part", 
              defaultValue: "TEC"
            }),
          }),
        }),
        subtitle: fields.text({
          label: "Subtitle description",
          multiline: true,
          defaultValue: "Transform your fixed costs into variable costs and gain immediate access to seasoned automotive sales professionals. Let's discuss how we can support your business development in Europe."
        }),
        ctaButton: fields.object({
          text: fields.text({ 
            label: "Button text",
            defaultValue: "Contact Our Experts"
          }),
          href: fields.text({ 
            label: "Button URL",
            defaultValue: "/contact"
          }),
        }),
      },
    }),
  },

  collections: {},
});

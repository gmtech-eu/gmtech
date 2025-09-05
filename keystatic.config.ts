import { config, fields, singleton } from "@keystatic/core";

// https://keystatic.com/docs/cloud
// Using Keystatic Cloud for simplified authentication

export default config({
  storage: {
    kind: "cloud",
  },
  cloud: {
    project: "gmtech/website", // Format: [TEAM_NAME]/[PROJECT_NAME]
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
          title: fields.text({
            label: "Contact section title",
            defaultValue: "Contact",
          }),
          address: fields.text({
            label: "Address",
            defaultValue: "France & Italy",
          }),
          email: fields.object({
            address: fields.text({
              label: "Email address",
              defaultValue: "contact@gmtec.eu",
            }),
            linkText: fields.text({
              label: "Email link text",
              defaultValue: "Send us a message",
            }),
          }),
          linkedIn: fields.object({
            url: fields.text({
              label: "LinkedIn URL",
              defaultValue: "https://www.linkedin.com/company/gmtec-group",
            }),
            linkText: fields.text({
              label: "LinkedIn link text",
              defaultValue: "Follow us",
            }),
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
          defaultValue: "Expertise in automotive consulting since 2003",
        }),
        subtitle: fields.text({
          label: "Subtitle/Description",
          defaultValue:
            "We have been committed and focused, supporting our Principals mainly in the French and Italian markets, facilitating the growth of their Sales.",
        }),
        primaryCTA: fields.object({
          text: fields.text({
            label: "Primary button text",
            defaultValue: "Contact us",
          }),
          href: fields.text({
            label: "Primary button URL",
            defaultValue: "/contact",
          }),
        }),
        secondaryCTA: fields.object({
          text: fields.text({
            label: "Secondary button text",
            defaultValue: "Learn about our mission",
          }),
          href: fields.text({
            label: "Secondary button URL",
            defaultValue: "/about",
          }),
        }),
        image: fields.object({
          src: fields.image({
            label: "Hero image",
            directory: "src/assets/images/hero",
            publicPath: "@assets/images/hero/",
            validation: { isRequired: true },
          }),
          alt: fields.text({
            label: "Image alt text",
            defaultValue: "GMTEC Group",
            validation: { isRequired: true },
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
          defaultValue: "Who we are",
        }),
        subtitle: fields.text({
          label: "Section description",
          multiline: true,
          defaultValue:
            "We've been active in the automotive sector for over 20 years. Our cross-disciplinary team provides flexible support for both our principals and end customers, in a wide range of areas including sales, engineering, logistics and quality. By offering agile and flexible solutions for business development, our mission is to strengthen the Automotive Supplier's presence in the field and increase the success chances for all the existing opportunities.",
        }),
        features: fields.array(
          fields.object({
            title: fields.text({ label: "Feature title" }),
            description: fields.text({
              label: "Feature description",
              multiline: true,
            }),
            image: fields.conditional(
              fields.checkbox({ label: "Has image?" }),
              {
                true: fields.object({
                  src: fields.image({
                    label: "Feature image",
                    directory: "src/assets/images/features",
                    publicPath: "@assets/images/features/",
                  }),
                  alt: fields.text({
                    label: "Image alt text",
                    defaultValue: "",
                  }),
                }),
                false: fields.empty(),
              },
            ),
            additionalItems: fields.conditional(
              fields.checkbox({ label: "Has additional list items?" }),
              {
                true: fields.array(fields.text({ label: "List item" }), {
                  label: "Additional features",
                }),
                false: fields.empty(),
              },
            ),
          }),
          {
            label: "Features",
          },
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
          defaultValue: "Our mission",
        }),
        subtitle: fields.text({
          label: "Section description",
          multiline: true,
          defaultValue:
            "We offer tailor-made Business Development support in the Automotive OE (Original Equipment) sector, adapting ourselves to the needs of our partners.",
        }),
        localExpertise: fields.object({
          title: fields.text({
            label: "Title",
            defaultValue: "Local Expertise",
          }),
          description: fields.text({
            label: "Description",
            multiline: true,
            defaultValue:
              "Deep market knowledge in France, Italy, Benelux and Spain with on-the-ground presence and cultural understanding",
          }),
          image: fields.object({
            src: fields.image({
              label: "Image",
              directory: "src/assets/images",
              publicPath: "@assets/images/",
            }),
            alt: fields.text({
              label: "Image alt text",
              defaultValue: "Local Expertise",
            }),
          }),
        }),
        projectManagement: fields.object({
          title: fields.text({
            label: "Title",
            defaultValue: "Complete Project Management",
          }),
          description: fields.text({
            label: "Description",
            multiline: true,
            defaultValue:
              'From project award to <span class="font-bold">SOP</span> (Start of Production), we provide comprehensive program management throughout the development phase and series production.',
          }),
          image: fields.object({
            src: fields.image({
              label: "Image",
              directory: "src/assets/images",
              publicPath: "@assets/images/",
            }),
            alt: fields.text({
              label: "Image alt text",
              defaultValue: "Project Management",
            }),
          }),
        }),
        agileResponse: fields.object({
          title: fields.text({
            label: "Title",
            defaultValue: "Agile Response",
          }),
          description: fields.text({
            label: "Description",
            multiline: true,
            defaultValue:
              "We intervene effectively in the event of engineering modifications, technical obstacles, quality or logistics issues. Our lean structure ensures rapid adaptation.",
          }),
          image: fields.object({
            src: fields.image({
              label: "Image",
              directory: "src/assets/images",
              publicPath: "@assets/images/",
            }),
            alt: fields.text({
              label: "Image alt text",
              defaultValue: "Agile Response",
            }),
          }),
        }),
        beyondSales: fields.object({
          title: fields.text({
            label: "Title",
            defaultValue: "Beyond Sales Support",
          }),
          listItems: fields.array(fields.text({ label: "List item" }), {
            label: "Support items",
          }),
          image: fields.object({
            src: fields.image({
              label: "Image",
              directory: "src/assets/images",
              publicPath: "@assets/images/",
            }),
            alt: fields.text({
              label: "Image alt text",
              defaultValue: "Beyond Sales Support",
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
          defaultValue: "Our Strategic Approach",
        }),
        subtitle: fields.text({
          label: "Section description",
          multiline: true,
          defaultValue:
            "Agile and responsive, we are constantly adapting thanks to our lean organizational structure and the versatility of our team. Our role goes far beyond simply supporting suppliers' sales teams - we actively contribute to development at every stage.",
        }),
        ctaButton: fields.object({
          text: fields.text({
            label: "Button text",
            defaultValue: "Learn More",
          }),
          href: fields.text({
            label: "Button URL",
            defaultValue: "/about",
          }),
        }),
        features: fields.object({
          identify: fields.text({
            label: "Identify feature description",
            multiline: true,
            defaultValue:
              "Identify opportunities and qualify potential partners in target markets.",
          }),
          develop: fields.text({
            label: "Develop feature description",
            multiline: true,
            defaultValue:
              "Develop tailored strategies and manage complex automotive projects.",
          }),
          transform: fields.text({
            label: "Transform feature description",
            multiline: true,
            defaultValue:
              "Transform partnerships into sustainable business growth and success.",
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
          defaultValue: "Our vision",
        }),
        subtitle: fields.text({
          label: "Section description",
          multiline: true,
          defaultValue:
            "To empower our core business within the automotive OE sector, we have been diversifying our activities for around five years with strategic initiatives. Our ambition: to become the most efficient and reliable local partner for suppliers to the automotive, agricultural and industrial sectors, with a presence that extends well beyond the European market.",
        }),
        features: fields.object({
          rnd: fields.object({
            heading: fields.text({
              label: "R&D heading",
              defaultValue: "Advanced R&D Activities",
            }),
            description: fields.text({
              label: "R&D description",
              multiline: true,
              defaultValue:
                "Launching new activities in advanced R&D, continuously learning on new technologies, new regulations and new market tendencies to stay at the forefront of automotive innovation.",
            }),
          }),
          multiSector: fields.object({
            heading: fields.text({
              label: "Multi-sector heading",
              defaultValue: "Multi-Sector Expertise",
            }),
            description: fields.text({
              label: "Multi-sector description",
              multiline: true,
              defaultValue:
                "Promotion of technologies not limited to the OE Automotive sector, but also for systems and components in the Agricultural, Industrial and Independent Aftermarket (IAM) areas.",
            }),
          }),
          expansion: fields.object({
            heading: fields.text({
              label: "Expansion heading",
              defaultValue: "Global Expansion",
            }),
            description: fields.text({
              label: "Expansion description",
              multiline: true,
              defaultValue:
                "Enlarge our presence in EMEA and in new Continents via opening of new offices or via partnerships, extending our reach to serve clients worldwide.",
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
            defaultValue: "Ready to accelerate your growth?",
          }),
          secondLine: fields.text({
            label: "Second line (before company name)",
            defaultValue: "Partner with",
          }),
          companyName: fields.object({
            highlighted: fields.text({
              label: "Company name highlighted part",
              defaultValue: "GM",
            }),
            normal: fields.text({
              label: "Company name normal part",
              defaultValue: "TEC",
            }),
          }),
        }),
        subtitle: fields.text({
          label: "Subtitle description",
          multiline: true,
          defaultValue:
            "Transform your fixed costs into variable costs and gain immediate access to seasoned automotive sales professionals. Let's discuss how we can support your business development in Europe.",
        }),
        ctaButton: fields.object({
          text: fields.text({
            label: "Button text",
            defaultValue: "Contact Our Experts",
          }),
          href: fields.text({
            label: "Button URL",
            defaultValue: "/contact",
          }),
        }),
      },
    }),

    // ========== ABOUT PAGE ==========
    aboutHero: singleton({
      label: "About - Hero Section",
      path: "src/data/aboutHero",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Main title",
          defaultValue: "Why outsource?",
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          defaultValue:
            "Entrusting your sales force to a specialized partner transforms fixed costs into variable costs, guarantees immediate access to seasoned sales people and frees up your in-house teams to focus on innovation and operations. You gain in flexibility, reduce your structural costs and get your offers to market faster.",
        }),
        statistics: fields.array(
          fields.object({
            label: fields.text({ label: "Statistic label" }),
            value: fields.text({ label: "Statistic value" }),
          }),
          {
            label: "Statistics",
          },
        ),
      },
    }),
    aboutExpertise: singleton({
      label: "About - Expertise Section",
      path: "src/data/aboutExpertise",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Section title",
          defaultValue: "Major Advantages:",
        }),
        expertise: fields.array(
          fields.object({
            title: fields.text({ label: "Expertise title" }),
            description: fields.text({
              label: "Expertise description",
              multiline: true,
            }),
          }),
          {
            label: "Expertise items",
          },
        ),
      },
    }),
    aboutPartners: singleton({
      label: "About - Partners Section",
      path: "src/data/aboutPartners",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Section title",
          defaultValue: "Our Partners",
        }),
        firstParagraph: fields.text({
          label: "First paragraph",
          multiline: true,
          defaultValue:
            "At GMTEC, we support a wide range of partners, from international groups to mid-sized companies. Whatever their profile, we provide them with on-the-ground expertise, a tailor-made approach and the proximity they need to boost their commercial effectiveness in Europe.",
        }),
        secondParagraph: fields.text({
          label: "Second paragraph",
          multiline: true,
          defaultValue:
            "We build long-term relationships based on trust, transparency and concrete results. Our added value lies in our ability to bridge the gap between cultures, teams and technical issues, facilitating exchanges and the development of ambitious projects.",
        }),
      },
    }),

    // ========== TECHNOLOGIES PAGE ==========
    technologiesHero: singleton({
      label: "Technologies - Hero Section",
      path: "src/data/technologiesHero",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Main title",
          defaultValue: "Technologies",
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          defaultValue:
            "We work mainly in the fields of chassis and thermal management, but our know-how can be adapted to meet the many technical challenges posed by developments in the automotive industry.",
        }),
      },
    }),
    technologiesList: singleton({
      label: "Technologies - Technology Sections",
      path: "src/data/technologies",
      format: { data: "json" },
      schema: {
        technologies: fields.array(
          fields.object({
            title: fields.text({ label: "Technology title" }),
            icon: fields.select({
              label: "Icon",
              options: [
                { label: "Zap (Powertrain)", value: "zap" },
                { label: "Layers (Chassis)", value: "layers" },
                { label: "Box (Interior)", value: "box" },
                { label: "Thermometer (Thermal)", value: "thermometer" },
              ],
              defaultValue: "zap",
            }),
            description: fields.text({
              label: "Technology description",
              multiline: true,
            }),
            features: fields.array(fields.text({ label: "Feature" }), {
              label: "Features list",
            }),
            images: fields.array(
              fields.object({
                src: fields.image({
                  label: "Slideshow image",
                  directory: "src/assets/images",
                  publicPath: "@assets/images/",
                }),
                alt: fields.text({
                  label: "Image alt text",
                  defaultValue: "",
                }),
              }),
              {
                label: "Slideshow images",
              },
            ),
          }),
          {
            label: "Technologies",
          },
        ),
      },
    }),
    technologiesCTA: singleton({
      label: "Technologies - Call to Action",
      path: "src/data/technologiesCTA",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "CTA title",
          defaultValue: "Ready to discuss your project?",
        }),
        description: fields.text({
          label: "CTA description",
          multiline: true,
          defaultValue:
            "Our team of experts is ready to help you navigate the complexities of automotive technology development.",
        }),
        button: fields.object({
          text: fields.text({
            label: "Button text",
            defaultValue: "Contact our experts",
          }),
          href: fields.text({
            label: "Button URL",
            defaultValue: "/contact",
          }),
        }),
      },
    }),

    // ========== CONTACT PAGE ==========
    contactHero: singleton({
      label: "Contact - Hero Section",
      path: "src/data/contactHero",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Main title",
          defaultValue: "Contact us",
        }),
        subtitle: fields.text({
          label: "Subtitle",
          multiline: true,
          defaultValue:
            "Get in touch with our experts in France and Italy. We're here to help you navigate the automotive industry.",
        }),
      },
    }),
    contactOffices: singleton({
      label: "Contact - Office Locations",
      path: "src/data/contactOffices",
      format: { data: "json" },
      schema: {
        offices: fields.array(
          fields.object({
            id: fields.text({
              label: "Office ID (lowercase)",
              defaultValue: "france",
            }),
            office: fields.text({
              label: "Office name",
              defaultValue: "France Office",
            }),
            address: fields.text({
              label: "Office address",
              defaultValue:
                "123 Avenue des Champs-Élysées, 75008 Paris, France",
            }),
            email: fields.text({
              label: "Contact email",
              defaultValue: "contact@gmtec.eu",
            }),
            avatarBackground: fields.text({
              label: "Avatar background color (hex without #)",
              defaultValue: "5aaeae",
              description: "Background color for the generated avatar",
            }),
          }),
          {
            label: "Office locations",
            itemLabel: (props) => props.fields.office.value || "Office",
          },
        ),
      },
    }),
    contactLinkedIn: singleton({
      label: "Contact - LinkedIn Section",
      path: "src/data/contactLinkedIn",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Section title",
          defaultValue: "Stay Connected",
        }),
        description: fields.text({
          label: "Section description",
          multiline: true,
          defaultValue:
            "Follow us on LinkedIn for the latest automotive industry insights and company updates.",
        }),
        linkedInUrl: fields.text({
          label: "LinkedIn profile URL",
          defaultValue: "https://www.linkedin.com/company/gmtec-group",
        }),
        buttonText: fields.text({
          label: "Button text",
          defaultValue: "Visit our LinkedIn page",
        }),
      },
    }),
  },

  collections: {},
});

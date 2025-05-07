export default function StructuredData() {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "ชื่อบริษัทของคุณ",
      image: "https://www.decorationline2009.com/logo.png",
      "@id": "https://www.decorationline2009.com",
      url: "https://www.decorationline2009.com",
      telephone: "+66-1234-5678",
      address: {
        "@type": "PostalAddress",
        streetAddress: "339/51 ถนน บางกรวยไทรน้อย บางบัวทอง บางรักพัฒนา",
        addressLocality: "นนทบุรี",
        postalCode: "11110",
        addressCountry: "TH",
      },
      sameAs: [
        "https://www.facebook.com/share/16G1RsqiVR/?mibextid=wwXIfr",
        "https://www.instagram.com/decorationline2009"
      ],
    };
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    );
  }
  
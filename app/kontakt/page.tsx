import React from "react";
import ContactForm from "@/components/ContactForm";

const KontaktPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kontaktirajte nas
          </h1>
          <p className="text-lg text-muted-foreground">
            Imate pitanje ili želite da saznate više? Pošaljite nam poruku i
            odgovorićemo vam u najkraćem mogućem roku.
          </p>
        </div>

        <ContactForm />

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Ili nas kontaktirajte direktno putem emaila:
          </p>
          <a
            href="mailto:zdenko.staff@gmail.com"
            className="text-primary hover:underline text-lg"
          >
            zdenko.staff@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default KontaktPage;

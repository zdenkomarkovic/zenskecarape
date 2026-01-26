import React from "react";
import ContactForm from "@/components/ContactForm";
import { Mail, Instagram, Facebook, MapPin } from "lucide-react";

const KontaktPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Kontaktirajte nas
            </h1>
            <p className="text-lg text-gray-600">
              Imate pitanje ili želite da saznate više? Pošaljite nam poruku i
              odgovorićemo vam u najkraćem mogućem roku.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <a
                      href="mailto:zenskecarapebg@gmail.com"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      zenskecarapebg@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <p className="text-gray-600">Beograd, Srbija</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Pratite nas na društvenim mrežama
                  </h3>
                  <div className="flex gap-4 justify-center">
                    <a
                      href="https://www.instagram.com/zenske_carape_bg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@zenske_carape_bg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/share/1EutJgwsv6/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="relative h-96 w-full overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186824.41883218427!2d20.29827!3d44.81638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7aa3d7b53fbd%3A0x1db8645cf2177ee4!2sBeograd!5e0!3m2!1ssr!2srs!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa Beograda"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KontaktPage;

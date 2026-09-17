import { MapPin, Phone } from "lucide-react";
import { FOOTER_CONTACTS, FOOTER_LOCATION } from "@/constants/footer";
import FooterLinks from "@/components/layout/FooterLinks";

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          {/* 로고 & 소개 */}
          <div>
            <span className="text-lg font-semibold tracking-tight">ALOM</span>
            <p className="mt-2 text-sm text-foreground/60">
              함께 성장하는 개발 동아리
            </p>
          </div>

          {/* 링크 */}
          <FooterLinks />

          {/* 연락처 & 위치 */}
          <div className="flex flex-col gap-2 text-sm text-foreground/70">
            {FOOTER_CONTACTS.map((contact) => (
              <div key={contact.role} className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  {contact.role} {contact.name} {contact.phone}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{FOOTER_LOCATION}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-foreground/10 text-xs text-foreground/50">
          © {new Date().getFullYear()} ALOM. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import React, { useEffect, useMemo } from 'react';
import './GdprPage.scss';
import { useTranslation } from 'react-i18next';
import LandingHeader from '../LandingPage/LandingHeader';
import Footer from '../LandingPage/Footer';
import CookieConsent from '../LandingPage/CookieConsent';
import { trackPageView } from '../../analytics';
import { parseLegalContent } from '../../utils/legalContent';

const GDPR_CONTENT_EN = `## 3.1 Purpose of This Statement

This GDPR Compliance Statement supplements our Privacy Policy and describes, specifically, how FEEL IT SERVICES SAS (and its subsidiaries) complies with the EU General Data Protection Regulation (Regulation (EU) 2016/679, "GDPR") and equivalent data protection laws (such as the UK GDPR) when processing personal data of users of the Artefact App.

## 3.2 Data Controller

The data controller for the purposes of the GDPR is:

**FEEL IT SERVICES SAS (and its subsidiaries)**
13bis Avenue de la Motte Picquet, 75007 Paris, France
RCS Paris B 531 361 459
Phone: +33 6 62 88 36 50
Email: connect@feel-it-services.com

We have not appointed a Data Protection Officer (DPO), as this is not currently required given the nature and scale of our processing activities. All data protection inquiries and requests should be directed to the contact details above.

## 3.3 Categories of Personal Data Processed

- Identity and contact data: name, email address, account credentials.
- Images: photos captured of museum exhibits/artworks for scanning and recognition purposes.
- Location data: approximate or precise location, where permission is granted.
- Technical and usage data: device identifiers, app usage statistics, crash logs, IP address.

## 3.4 Purposes and Legal Bases

- Providing App functionality (account, scanning, itineraries) — Performance of a contract (Art. 6(1)(b) GDPR).
- Camera and location access for scanning and nearby recommendations — Consent (Art. 6(1)(a) GDPR).
- Analytics and App improvement — Legitimate interests (Art. 6(1)(f) GDPR).
- Security, fraud prevention, and legal compliance — Legitimate interests / Legal obligation (Art. 6(1)(c)/(f) GDPR).

## 3.5 Your Rights Under the GDPR

If you are located in the EEA, UK, or another jurisdiction with similar data protection laws, you have the following rights regarding your personal data:

- Right of access — obtain confirmation of, and access to, your personal data we process.
- Right to rectification — request correction of inaccurate or incomplete data.
- Right to erasure ("right to be forgotten") — request deletion of your data, subject to legal exceptions.
- Right to restriction of processing — request that we limit how we use your data in certain circumstances.
- Right to data portability — receive your data in a structured, machine-readable format, and transmit it to another controller.
- Right to object — object to processing based on legitimate interests or for direct marketing purposes.
- Right to withdraw consent — withdraw consent at any time, without affecting the lawfulness of processing carried out before withdrawal.
- Right not to be subject to solely automated decision-making producing legal or similarly significant effects (see Section 3.7 below).

## 3.6 How to Exercise Your Rights

To exercise any of the above rights, please contact us at the details below. We will respond to your request within one (1) month, as required by the GDPR, extendable by two further months for complex requests (we will inform you if this extension applies). We may need to verify your identity before processing your request.

**FEEL IT SERVICES SAS (and its subsidiaries)**
13bis Avenue de la Motte Picquet, 75007 Paris, France
RCS Paris B 531 361 459
Phone: +33 6 62 88 36 50
Email: connect@feel-it-services.com

## 3.7 Automated Decision-Making and AI Processing

The App uses AI-based image recognition to identify artworks and exhibits from photos you capture. This process:

- Analyzes only the visual content of the artwork/exhibit in the image, not personal data about you;
- Does not use facial recognition, biometric identification of individuals, or profiling of users;
- Does not produce legal or similarly significant effects concerning you, and therefore does not constitute automated decision-making within the meaning of Article 22 GDPR.

## 3.8 International Data Transfers

Where personal data is transferred outside the EEA/UK (for example, to hosting, analytics, or AI service providers located in other countries), we ensure such transfers are protected by appropriate safeguards recognized under the GDPR, including the European Commission's Standard Contractual Clauses (SCCs), adequacy decisions, or equivalent mechanisms.

Specifically, our processors (Google Analytics, Mixpanel, and OpenAI) are based in the United States. Data transferred to these processors is protected through the European Commission's Standard Contractual Clauses (SCCs) and, where applicable, additional contractual and technical safeguards.

## 3.9 Data Retention

We retain personal data only for as long as necessary for the purposes set out in this Statement and our Privacy Policy, in line with applicable legal requirements. Upon account deletion, personal data is deleted or anonymized within a reasonable period, except where retention is required by law.

## 3.10 Data Security Measures

We apply appropriate technical and organizational measures to protect personal data, including access controls, encryption of credentials, and secure transmission protocols (HTTPS/TLS), proportionate to the risks associated with the processing.

## 3.11 Right to Lodge a Complaint

If you believe your data protection rights have been violated, you have the right to lodge a complaint with a supervisory authority. In France, the competent authority is:

Commission Nationale de l'Informatique et des Libertés (CNIL)
3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, France — www.cnil.fr

If you reside in another EEA country or the UK, you may also lodge a complaint with your local data protection supervisory authority.

## 3.12 Contact Us

For any questions regarding this GDPR Compliance Statement or to exercise your data protection rights, please contact:

**FEEL IT SERVICES SAS (and its subsidiaries)**
13bis Avenue de la Motte Picquet, 75007 Paris, France
RCS Paris B 531 361 459
Phone: +33 6 62 88 36 50
Email: connect@feel-it-services.com`;

const GDPR_CONTENT_RO = `## 3.1 Scopul acestei declarații

Această Declarație de Conformitate RGPD completează Politica noastră de Confidențialitate și descrie, în mod specific, modul în care FEEL IT SERVICES SAS (și filialele sale) respectă Regulamentul General privind Protecția Datelor al UE (Regulamentul (UE) 2016/679, "RGPD") și legislația echivalentă privind protecția datelor (precum UK GDPR) atunci când prelucrează datele cu caracter personal ale utilizatorilor Aplicației Artefact.

## 3.2 Operatorul de date

Operatorul de date în sensul RGPD este:

**FEEL IT SERVICES SAS (și filialele sale)**
13bis Avenue de la Motte Picquet, 75007 Paris, Franța
RCS Paris B 531 361 459
Telefon: +33 6 62 88 36 50
Email: connect@feel-it-services.com

Nu am desemnat un Responsabil cu Protecția Datelor (DPO), deoarece acest lucru nu este în prezent necesar, având în vedere natura și amploarea activităților noastre de prelucrare. Toate solicitările și întrebările privind protecția datelor trebuie adresate la datele de contact de mai sus.

## 3.3 Categorii de date cu caracter personal prelucrate

- Date de identitate și de contact: nume, adresă de email, credențiale de cont.
- Imagini: fotografii ale exponatelor/operelor de artă din muzee, capturate în scopul scanării și recunoașterii.
- Date de localizare: locație aproximativă sau precisă, acolo unde este acordată permisiunea.
- Date tehnice și de utilizare: identificatori ai dispozitivului, statistici de utilizare a aplicației, jurnale de erori, adresă IP.

## 3.4 Scopuri și temeiuri juridice

- Furnizarea funcționalităților Aplicației (cont, scanare, itinerarii) — Executarea unui contract (Art. 6 alin. (1) lit. (b) RGPD).
- Accesul la cameră și localizare pentru scanare și recomandări din apropiere — Consimțământ (Art. 6 alin. (1) lit. (a) RGPD).
- Analiză și îmbunătățirea Aplicației — Interese legitime (Art. 6 alin. (1) lit. (f) RGPD).
- Securitate, prevenirea fraudei și conformitate legală — Interese legitime / Obligație legală (Art. 6 alin. (1) lit. (c)/(f) RGPD).

## 3.5 Drepturile dumneavoastră conform RGPD

Dacă vă aflați în SEE, Regatul Unit sau o altă jurisdicție cu legi similare privind protecția datelor, aveți următoarele drepturi cu privire la datele dumneavoastră cu caracter personal:

- Dreptul de acces — de a obține confirmarea și accesul la datele dumneavoastră cu caracter personal pe care le prelucrăm.
- Dreptul la rectificare — de a solicita corectarea datelor inexacte sau incomplete.
- Dreptul la ștergere ("dreptul de a fi uitat") — de a solicita ștergerea datelor dumneavoastră, sub rezerva excepțiilor legale.
- Dreptul la restricționarea prelucrării — de a solicita limitarea modului în care utilizăm datele dumneavoastră în anumite circumstanțe.
- Dreptul la portabilitatea datelor — de a primi datele dumneavoastră într-un format structurat, care poate fi citit automat, și de a le transmite unui alt operator.
- Dreptul la opoziție — de a vă opune prelucrării bazate pe interese legitime sau efectuate în scopuri de marketing direct.
- Dreptul de a retrage consimțământul — de a retrage consimțământul în orice moment, fără a afecta legalitatea prelucrării efectuate înainte de retragere.
- Dreptul de a nu face obiectul unei decizii bazate exclusiv pe prelucrare automată, care produce efecte juridice sau vă afectează în mod similar semnificativ (a se vedea Secțiunea 3.7 de mai jos).

## 3.6 Cum vă puteți exercita drepturile

Pentru a vă exercita oricare dintre drepturile de mai sus, vă rugăm să ne contactați la datele de mai jos. Vă vom răspunde la solicitare în termen de una (1) lună, conform cerințelor RGPD, termen ce poate fi prelungit cu încă două luni pentru solicitări complexe (vă vom informa dacă se aplică această prelungire). Este posibil să fie necesar să vă verificăm identitatea înainte de a procesa solicitarea.

**FEEL IT SERVICES SAS (și filialele sale)**
13bis Avenue de la Motte Picquet, 75007 Paris, Franța
RCS Paris B 531 361 459
Telefon: +33 6 62 88 36 50
Email: connect@feel-it-services.com

## 3.7 Procesul decizional automatizat și prelucrarea prin IA

Aplicația utilizează recunoașterea imaginilor bazată pe IA pentru a identifica opere de artă și exponate din fotografiile pe care le capturați. Acest proces:

- Analizează doar conținutul vizual al operei de artă/exponatului din imagine, nu date cu caracter personal despre dumneavoastră;
- Nu utilizează recunoașterea facială, identificarea biometrică a persoanelor sau crearea de profiluri ale utilizatorilor;
- Nu produce efecte juridice sau alte efecte semnificative similare cu privire la dumneavoastră și, prin urmare, nu constituie un proces decizional automatizat în sensul Articolului 22 din RGPD.

## 3.8 Transferuri internaționale de date

Atunci când datele cu caracter personal sunt transferate în afara SEE/Regatului Unit (de exemplu, către furnizori de găzduire, analiză sau servicii de IA situați în alte țări), ne asigurăm că aceste transferuri sunt protejate prin garanții adecvate, recunoscute conform RGPD, inclusiv Clauzele Contractuale Standard (SCC) ale Comisiei Europene, deciziile de adecvare sau mecanisme echivalente.

Mai exact, persoanele împuternicite de noi (Google Analytics, Mixpanel și OpenAI) sunt situate în Statele Unite. Datele transferate către aceste persoane împuternicite sunt protejate prin Clauzele Contractuale Standard (SCC) ale Comisiei Europene și, acolo unde este cazul, prin garanții contractuale și tehnice suplimentare.

## 3.9 Păstrarea datelor

Păstrăm datele cu caracter personal doar atât timp cât este necesar pentru scopurile prevăzute în această Declarație și în Politica noastră de Confidențialitate, în conformitate cu cerințele legale aplicabile. La ștergerea contului, datele cu caracter personal sunt șterse sau anonimizate într-o perioadă rezonabilă, cu excepția cazului în care păstrarea este cerută de lege.

## 3.10 Măsuri de securitate a datelor

Aplicăm măsuri tehnice și organizatorice adecvate pentru a proteja datele cu caracter personal, inclusiv controale ale accesului, criptarea credențialelor și protocoale sigure de transmisie (HTTPS/TLS), proporționale cu riscurile asociate prelucrării.

## 3.11 Dreptul de a depune o plângere

Dacă considerați că drepturile dumneavoastră privind protecția datelor au fost încălcate, aveți dreptul de a depune o plângere la o autoritate de supraveghere. În Franța, autoritatea competentă este:

Commission Nationale de l'Informatique et des Libertés (CNIL)
3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, France — www.cnil.fr

Dacă locuiți într-o altă țară din SEE sau în Regatul Unit, puteți depune, de asemenea, o plângere la autoritatea locală de supraveghere a protecției datelor.

## 3.12 Contactați-ne

Pentru orice întrebări legate de această Declarație de Conformitate RGPD sau pentru a vă exercita drepturile privind protecția datelor, vă rugăm să ne contactați:

**FEEL IT SERVICES SAS (și filialele sale)**
13bis Avenue de la Motte Picquet, 75007 Paris, Franța
RCS Paris B 531 361 459
Telefon: +33 6 62 88 36 50
Email: connect@feel-it-services.com`;

const GDPR_BLOCKS_EN = parseLegalContent(GDPR_CONTENT_EN);
const GDPR_BLOCKS_RO = parseLegalContent(GDPR_CONTENT_RO);

const GdprPage = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView('GDPR Page');
  }, []);

  const blocks = useMemo(
    () => (i18n.resolvedLanguage === 'ro' ? GDPR_BLOCKS_RO : GDPR_BLOCKS_EN),
    [i18n.resolvedLanguage]
  );

  return (
    <div className="gdpr-page">
      <LandingHeader />

      <main className="gdpr-page__main">
        <span className="gdpr-page__eyebrow">
          {t('landing.gdprPage.eyebrow', 'Legal')}
        </span>
        <h1 className="gdpr-page__title font-display">
          {t('landing.gdprPage.title', 'GDPR Compliance Statement')}
        </h1>
        <p className="gdpr-page__updated">
          {t('landing.gdprPage.lastUpdated', 'Last updated: August 21, 2026')}
        </p>

        <div className="gdpr-page__content">
          {blocks.map((block, index) => {
            if (block.type === 'heading') {
              return (
                <h2 key={index} className="gdpr-page__heading">
                  {block.text}
                </h2>
              );
            }

            if (block.type === 'subheading') {
              return (
                <h3 key={index} className="gdpr-page__subheading">
                  {block.text}
                </h3>
              );
            }

            if (block.type === 'list') {
              return (
                <ul key={index} className="gdpr-page__list">
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.label ? `${item.label}: ${item.text}` : item.text}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={index} className="gdpr-page__paragraph">
                {block.bold ? <strong>{block.text}</strong> : block.text}
              </p>
            );
          })}
        </div>
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
};

export default GdprPage;

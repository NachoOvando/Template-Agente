import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArticleContent } from "@/components/ArticleComponents";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="box-content max-w-[80rem] px-6 md:px-[calc(18vw-10rem)] mx-auto mt-[4rem] mb-[8rem]">
        <header className="mb-[4rem] text-center">
          <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[5rem] font-semibold tracking-[-0.01em] leading-[1.2] mb-[1rem]">
            Terms & Conditions
          </h1>
          <p className="text-[1.6rem] text-muted-foreground">
            Last updated: January 10, 2025
          </p>
        </header>

        <ArticleContent>
          <p>
            Welcome to Editorial. By accessing or using our website, you agree
            to be bound by these Terms and Conditions. Please read them
            carefully.
          </p>

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement. If you do not
            agree to abide by the above, please do not use this service.
          </p>

          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the
            materials (information or software) on Editorial's website for
            personal, non-commercial transitory viewing only. This is the grant
            of a license, not a transfer of title, and under this license you
            may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>
              Use the materials for any commercial purpose or for any public
              display
            </li>
            <li>
              Attempt to decompile or reverse engineer any software contained on
              Editorial's website
            </li>
            <li>
              Remove any copyright or other proprietary notations from the
              materials
            </li>
            <li>
              Transfer the materials to another person or "mirror" the materials
              on any other server
            </li>
          </ul>

          <h2>Content Ownership and Copyright</h2>
          <p>
            All content published on Editorial, including text, images, videos,
            and graphics, is protected by copyright and owned by Editorial or
            the original content creators. The compilation of all content on
            this site is the exclusive property of Editorial.
          </p>

          <h3>User-Generated Content</h3>
          <p>
            If you submit content to Editorial, you grant us a non-exclusive,
            worldwide, royalty-free license to use, reproduce, modify, and
            display your content on our platform. You represent and warrant that
            you own or have the necessary rights to the content you submit.
          </p>

          <h2>Disclaimer</h2>
          <p>
            The materials on Editorial's website are provided on an 'as is'
            basis. Editorial makes no warranties, expressed or implied, and
            hereby disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </p>

          <h2>Limitations</h2>
          <p>
            In no event shall Editorial or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use the materials on Editorial's website.
          </p>

          <h2>Accuracy of Materials</h2>
          <p>
            The materials appearing on Editorial's website could include
            technical, typographical, or photographic errors. Editorial does not
            warrant that any of the materials on its website are accurate,
            complete, or current. Editorial may make changes to the materials
            contained on its website at any time without notice.
          </p>

          <h2>Links to Third-Party Sites</h2>
          <p>
            Editorial has not reviewed all of the sites linked to its website
            and is not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by Editorial of the
            site. Use of any such linked website is at the user's own risk.
          </p>

          <h2>User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Use the website for any unlawful purpose or in violation of these
              Terms
            </li>
            <li>
              Post or transmit any content that is offensive, harmful, or
              violates others' rights
            </li>
            <li>Impersonate any person or entity</li>
            <li>
              Interfere with or disrupt the website or servers or networks
              connected to the website
            </li>
            <li>
              Collect or store personal data about other users without their
              consent
            </li>
            <li>Engage in any form of automated use of the system</li>
          </ul>

          <h2>Account Termination</h2>
          <p>
            We reserve the right to terminate or suspend access to our website
            immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if you breach the Terms and
            Conditions.
          </p>

          <h2>Modifications to Service</h2>
          <p>
            Editorial reserves the right to modify or discontinue, temporarily
            or permanently, the service (or any part thereof) with or without
            notice. Editorial shall not be liable to you or to any third party
            for any modification, suspension, or discontinuance of the service.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms and Conditions are governed by and construed in
            accordance with the laws of the United States, and you irrevocably
            submit to the exclusive jurisdiction of the courts in that location.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            Editorial reserves the right to revise these Terms and Conditions at
            any time. By using this website, you are agreeing to be bound by the
            then current version of these Terms and Conditions.
          </p>

          <h2>Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or
            invalid, that provision will be limited or eliminated to the minimum
            extent necessary so that these Terms will otherwise remain in full
            force and effect.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us:
          </p>
          <ul>
            <li>By email: legal@editorial.com</li>
            <li>Through our contact page: <a href="/contact">/contact</a></li>
          </ul>
        </ArticleContent>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;

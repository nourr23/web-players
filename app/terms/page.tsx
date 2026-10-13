import type { Metadata } from "next";

import { LegalPage } from "../_components/legal-page";
import { SUPPORT_EMAIL } from "../_lib/site";

export const metadata: Metadata = {
  title: "Terms of Service — Padel Galaxio",
  description: "The rules for using Padel Galaxio, including our community guidelines.",
};

/** Keep in sync with the app's Terms (`auth.signUp.termsModalBody` in the mobile app). */
export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="By creating a Padel Galaxio account, you agree to these terms. Please read them carefully."
    >
      <h2>Using Padel Galaxio</h2>
      <p>
        You agree to use the app respectfully and in line with padel community
        guidelines. You are responsible for keeping your login details secure and for
        activity that happens on your account.
      </p>

      <h2>Your profile</h2>
      <p>
        You must provide accurate profile information. Fake accounts, harassment, spam,
        or misuse of community features may lead to suspension or removal of your
        account.
      </p>

      <h2>Zero tolerance for objectionable content and abusive users</h2>
      <p>
        Padel Galaxio does <strong>not tolerate objectionable content or abusive
        users</strong>. Content that is offensive, hateful, sexual, violent,
        threatening or harassing is not allowed in messages, posts, stories, photos or
        profiles.
      </p>
      <ul>
        <li>You can report any message, post, story or player in the app.</li>
        <li>You can block any user at any time.</li>
        <li>
          We review reports within 24 hours, remove objectionable content, and suspend
          or remove the accounts responsible.
        </li>
      </ul>

      <h2>Your content</h2>
      <p>
        You keep ownership of the content you post. You give Padel Galaxio permission
        to display it in the app to the people it is shared with. Do not post content
        you do not have the right to share.
      </p>

      <h2>Matches, rankings and rewards</h2>
      <p>
        Match results, rankings, points and community content are provided for the
        padel experience and may change as we improve the product. Rewards and
        milestones are offered by Padel Galaxio and follow the rules shown in the app.
      </p>

      <h2>Ending your account</h2>
      <p>
        You can delete your account at any time — see{" "}
        <a href="/delete-account">how to delete your account</a>. We may suspend or
        remove accounts that break these terms.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms. When we do, the app will ask you to accept the new
        version before continuing.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
      </p>
    </LegalPage>
  );
}

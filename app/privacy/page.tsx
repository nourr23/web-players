import type { Metadata } from "next";

import { LegalPage } from "../_components/legal-page";
import { SUPPORT_EMAIL } from "../_lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Padel Galaxio",
  description: "What data Padel Galaxio collects, why, and how you can control it.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This policy explains what information the Padel Galaxio mobile app collects, how we use it, and the choices you have."
    >
      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Account:</strong> your email address and password, or your Google or
          Apple account when you sign in with them.
        </li>
        <li>
          <strong>Profile:</strong> name, profile and cover photos, phone number (if you
          add it), city, padel level, preferred hand and position, gender, height and
          weight.
        </li>
        <li>
          <strong>Activity:</strong> games you create or join, court bookings, match
          results, player ratings, points and referrals, posts, stories, photos you
          upload, and your friends and groups.
        </li>
        <li>
          <strong>Messages:</strong> chat messages, photos, voice messages, and your
          location <strong>only when you choose to share it</strong> in a chat.
        </li>
        <li>
          <strong>Safety:</strong> reports you submit and users you block.
        </li>
        <li>
          <strong>Device:</strong> a push notification token so we can send you
          notifications, and basic technical information needed to run the app.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To create your account and sign you in.</li>
        <li>
          To run the app’s features: matchmaking, bookings, rankings, messaging,
          stories and notifications.
        </li>
        <li>To keep the community safe, review reports and enforce our Terms.</li>
        <li>To fix problems and improve the app.</li>
      </ul>
      <p>
        We <strong>do not sell</strong> your personal information.
      </p>

      <h2>Who we share it with</h2>
      <p>
        Other players see your public profile (name, photo, level, city, ranking) and
        the content you post. Messages are visible only to the people in the
        conversation. We share data only with service providers that help us run the
        app:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> — hosting, database, file storage and sign-in.
        </li>
        <li>
          <strong>OneSignal</strong> — push notifications.
        </li>
        <li>
          <strong>Google</strong> and <strong>Apple</strong> — only if you choose to
          sign in with them.
        </li>
        <li>
          <strong>Google AdMob</strong> — only when the app shows optional rewarded
          videos.
        </li>
      </ul>
      <p>We may also share information when required by law.</p>

      <h2>How long we keep it</h2>
      <p>
        We keep your information while your account is active. When you delete your
        account, your profile details, photos and stories are removed. Match results
        and messages already sent to others are kept without your name, as described
        on our <a href="/delete-account">account deletion page</a>.
      </p>

      <h2>Your choices and rights</h2>
      <ul>
        <li>Edit your profile at any time in the app.</li>
        <li>Turn notifications and location sharing on or off in your phone settings.</li>
        <li>Block users and report content in the app.</li>
        <li>
          Delete your account in the app (Profile → Settings → Delete account) or{" "}
          <a href="/delete-account">without the app</a>.
        </li>
        <li>
          Ask us for a copy of your data or to correct it by emailing{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </li>
      </ul>

      <h2>Children</h2>
      <p>
        Padel Galaxio is not intended for children under 13, and we do not knowingly
        collect information from them.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy. We will show the updated date at the top of this
        page and, for important changes, let you know in the app.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about your privacy: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
      </p>
    </LegalPage>
  );
}

import type { Metadata } from "next";

import { LegalPage } from "../_components/legal-page";
import { SUPPORT_EMAIL } from "../_lib/site";

export const metadata: Metadata = {
  title: "Support — Padel Galaxio",
  description: "Get help with Padel Galaxio: contact our team and find answers to common questions.",
};

/** App Store "Support URL". Keep the FAQ steps in sync with the mobile app's screens. */
export default function SupportPage() {
  return (
    <LegalPage
      eyebrow="Help"
      title="Support"
      intro="Need help with Padel Galaxio? Contact our team or find a quick answer below."
    >
      <h2>Contact us</h2>
      <p>
        Email us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We reply
        within 48 hours.
      </p>
      <p>To help us answer faster, please include:</p>
      <ul>
        <li>The email address you use to sign in to the app.</li>
        <li>For a bug: your phone model and what you were doing when it happened.</li>
      </ul>

      <h2>How do I find players or join a game?</h2>
      <p>
        Open games appear in the home feed. Tap <strong>Join</strong> on a game to send a
        request; the host approves it and you will see the game under your upcoming
        games. You can filter the feed by location, date, level and gender.
      </p>
      <p>
        Hosting a game? Tap the <strong>+</strong> button, choose{" "}
        <strong>Find Players</strong> and publish one of your upcoming games, or create a
        post for a game you booked elsewhere. Looking for a match? Choose{" "}
        <strong>Seeking a Game</strong> so hosts nearby can invite you.
      </p>

      <h2>How do I book a court?</h2>
      <p>
        Tap the <strong>+</strong> button and choose <strong>Book a Game</strong>. Pick a
        club, a day and a free time slot, choose a court, then tap{" "}
        <strong>Confirm Booking</strong>. Your booking appears under Upcoming games on
        your profile.
      </p>

      <h2>How is my level confirmed?</h2>
      <p>
        You set your own level on your profile. After a match, the other players can
        rate you and say whether your level looks right, lower or higher.
      </p>
      <ul>
        <li>
          Once at least 3 players have voted and most of them (60% or more) confirm it,
          your level shows as <strong>Verified</strong>.
        </li>
        <li>
          If most players disagree, it shows as <strong>Disputed</strong> and the app may
          suggest updating it.
        </li>
        <li>You can see every vote and change in your level history.</li>
      </ul>

      <h2>How do I earn points?</h2>
      <ul>
        <li>Book a club court: +1 point.</li>
        <li>Submit a match result: +2 points for every player in the match.</li>
        <li>Rate a teammate after a match: +2 points.</li>
        <li>Add 3 to 8 match photos: +1 point after approval.</li>
        <li>Invite a friend who signs up with your code: +5 points (your friend gets +2).</li>
      </ul>
      <p>
        Points add up over the season and unlock free rewards. See{" "}
        <strong>Prizes &amp; Rules</strong> in the app menu for milestones and the full
        rules.
      </p>

      <h2>How do I report or block someone?</h2>
      <p>
        Open the player&apos;s profile and tap <strong>Report</strong> or{" "}
        <strong>Block</strong>. You can also report a post, story or listing from its
        report button, and report or block someone from a chat by long-pressing their
        message. Our team reviews every report within 24 hours.
      </p>
      <p>
        Blocked players can&apos;t message you and you won&apos;t see their posts or
        stories. They are not notified. You can unblock people from{" "}
        <strong>Settings → Blocked users</strong>.
      </p>

      <h2>I&apos;m not getting notifications</h2>
      <ul>
        <li>
          In the app, go to <strong>Profile → Settings → Notifications</strong>, make sure{" "}
          <strong>Mute all notifications</strong> is off and the types you want are on.
        </li>
        <li>
          On your phone, open the system settings, find Padel Galaxio and allow
          notifications.
        </li>
        <li>Check that Focus or Do Not Disturb mode is not hiding them.</li>
      </ul>
      <p>
        Still nothing? Email us with your phone model and we will take a look.
      </p>

      <h2>How do I change my email or password?</h2>
      <p>
        To change your password, go to <strong>Profile → Settings → Change password</strong>.
        If you signed up with Apple or Google, choose <strong>Set password</strong> to add
        one. Forgot it? Tap <strong>Forgot Password?</strong> on the sign-in screen.
      </p>
      <p>
        Your email can&apos;t be changed in the app yet. Email us from your current
        address with the new one you want to use, and we will update it for you.
      </p>

      <h2>Delete your account</h2>
      <p>
        You can delete your account from <strong>Profile → Settings → Delete account</strong>{" "}
        in the app — see <a href="/delete-account">how to delete your account</a>.
      </p>

      <h2>More information</h2>
      <ul>
        <li>
          <a href="/privacy">Privacy Policy</a>
        </li>
        <li>
          <a href="/terms">Terms of Service</a>
        </li>
      </ul>
    </LegalPage>
  );
}

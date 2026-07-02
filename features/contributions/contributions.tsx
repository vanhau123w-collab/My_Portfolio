import type { Activity } from "@/components/kibo-ui/contribution-graph";
import { ContributionsGraph } from "./graph";

type ContributionsResponse = {
  total: Record<string, number>;
  contributions: Activity[];
};

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthYear = (iso: string) => {
  const [year, month] = iso.split("-");
  return `${MONTH_LABELS[Number(month) - 1]} ${year}`;
};

import { SITE_INFO } from "@/config/site";

async function getContributions() {
  const username = SITE_INFO.username;
  const url = new URL(
    `/v4/${username}`,
    "https://github-contributions-api.jogruber.de",
  );

  // Bypass SSL certificate verification for this public API in environments with custom proxies
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      console.warn(`Failed to fetch GitHub contributions: ${response.status}`);
      return { contributions: [], total: 0, range: undefined };
    }

    const data = (await response.json()) as ContributionsResponse;
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const oneYearAgoStr = oneYearAgo.toISOString().split("T")[0];
    const todayStr = today.toISOString().split("T")[0];

    const contributions = data.contributions
      .filter(
        (activity) =>
          activity.date >= oneYearAgoStr && activity.date <= todayStr,
      )
      .sort((a, b) => a.date.localeCompare(b.date));
    const total = contributions.reduce(
      (sum, activity) => sum + activity.count,
      0,
    );
    const range =
      contributions.length > 0
        ? `${monthYear(contributions[0].date)} - ${monthYear(contributions[contributions.length - 1].date)}`
        : undefined;

    return { contributions, total, range };
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return { contributions: [], total: 0, range: undefined };
  }
}

async function Contributions() {
  const contributions = await getContributions();

  return (
    <section
      id="contributions"
      className="page-section scroll-mt-navigation-scroll-margin"
    >
      <p className="page-section-title">Contributions</p>
      <div className="page-section-body">
        <ContributionsGraph
          contributions={contributions.contributions}
          total={contributions.total}
          range={contributions.range}
        />
      </div>
    </section>
  );
}

export { Contributions };

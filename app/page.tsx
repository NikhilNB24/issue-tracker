import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import Pagination from "./components/Pagination";

export default async function Home() {
    const openIssueCount = await prisma.issue.count({
        where: {
            status: "OPEN",
        },
    });
    const inProgressIssueCount = await prisma.issue.count({
        where: {
            status: "IN_PROGRESS",
        },
    });
    const closedIssueCount = await prisma.issue.count({
        where: {
            status: "CLOSED",
        },
    });
    return (
        <IssueSummary
            open={openIssueCount}
            inProgress={inProgressIssueCount}
            closed={closedIssueCount}
        />
    );
}

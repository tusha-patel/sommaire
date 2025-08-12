import BgGradient from "@/components/common/bg-gradient";
import { MotionDiv, MotionH1, MotionP } from "@/components/common/motion-wrapper";
import EmptySummaryState from "@/components/summaries/empty-summary-state";
import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getSummaries } from "@/lib/summaries";
import { hasReachedUploadLimit } from "@/lib/user";
import { itemVariants } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage({ searchParams }: { searchParams: { page?: string } }) {
    const user = await currentUser();
    const userId = user?.id;
    const email = user?.emailAddresses[0].emailAddress;

    if (!userId || !email) return redirect("/sign-in");

    const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit({ userId, email });

    const page = Number(searchParams.page) || 1;
    const perPage = 6;

    // Fetch all summaries (you can make your DB query return paginated data for better perf)
    const summaries = await getSummaries(userId);

    // Pagination logic
    const totalSummaries = summaries.length;
    const totalPages = Math.ceil(totalSummaries / perPage);
    const paginatedSummaries = summaries.slice((page - 1) * perPage, page * perPage);

    return (
        <main className="min-h-screen">
            <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
            <MotionDiv initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }} className="container mx-auto flex flex-col gap-4">
                <div className="px-2 py-12 sm:py-24 ">
                    <div className="flex gap-4 mb-8 justify-between ">
                        <div className="flex flex-col gap-2 ">
                            <MotionH1 variants={itemVariants} initial="hidden" whileInView={"visible"} viewport={{ once: true, margin: '-100px' }} className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">Your Summaries</MotionH1>
                            <MotionP variants={itemVariants} initial="hidden" animate={"visible"}>Transform your PDFs into concise, actionable insights</MotionP>
                        </div>
                        {!hasReachedLimit && (
                            <MotionDiv variants={itemVariants} initial='hidden' animate='visible' whileHover={{ scale: 1.05 }} className="self-start">
                                <Button variant="link" className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 duration-300 group hover:no-underline">
                                    <Link href="/upload" className="flex items-center text-white">
                                        <Plus className="w-5 h-5 mr-2" />
                                        New Summary
                                    </Link>
                                </Button>
                            </MotionDiv>
                        )}
                    </div>

                    {hasReachedLimit && (
                        <MotionDiv variants={itemVariants} initial='hidden' animate='visible' className="mb-6">
                            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800 ">
                                <p className="text-sm">You've reached the limit of {uploadLimit} uploads on the basic plan.
                                    <Link href={"/#pricing"} className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center ">
                                        Click here to upgrade to Pro{" "}
                                        <ArrowRight className="w-5 h-5 inline-block" />
                                    </Link>
                                    for unlimited uploads
                                </p>
                            </div>
                        </MotionDiv>
                    )}

                    {paginatedSummaries.length === 0 ? (
                        <EmptySummaryState />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
                                {paginatedSummaries.map((summary, index) => (
                                    <SummaryCard key={index} summary={summary} />
                                ))}
                            </div>

                            {/* Pagination UI */}
                            {totalPages > 1 && (
                                <div className="mt-8 flex justify-center">
                                    <Pagination>
                                        <PaginationContent>

                                            {/* Previous Button */}
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href={page > 1 ? `?page=${page - 1}` : undefined}
                                                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                                                />
                                            </PaginationItem>

                                            {/* Calculate page chunk */}
                                            {(() => {
                                                const chunkSize = 4
                                                const start = Math.floor((page - 1) / chunkSize) * chunkSize + 1
                                                const end = Math.min(start + chunkSize - 1, totalPages)

                                                const items = []

                                                // Show "1 ..." if start > 1
                                                if (start > 1) {
                                                    items.push(
                                                        <PaginationItem key="first">
                                                            <PaginationLink href="?page=1">1</PaginationLink>
                                                        </PaginationItem>
                                                    )
                                                    items.push(
                                                        <PaginationItem key="dots-start">
                                                            <span className="px-2">...</span>
                                                        </PaginationItem>
                                                    )
                                                }

                                                // Main chunk
                                                for (let i = start; i <= end; i++) {
                                                    items.push(
                                                        <PaginationItem key={i}>
                                                            <PaginationLink
                                                                href={`?page=${i}`}
                                                                isActive={page === i}
                                                            >
                                                                {i}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    )
                                                }

                                                // Show "... totalPages" if end < totalPages
                                                if (end < totalPages) {
                                                    items.push(
                                                        <PaginationItem key="dots-end">
                                                            <span className="px-2">...</span>
                                                        </PaginationItem>
                                                    )
                                                    items.push(
                                                        <PaginationItem key="last">
                                                            <PaginationLink href={`?page=${totalPages}`}>
                                                                {totalPages}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    )
                                                }

                                                return items
                                            })()}

                                            {/* Next Button */}
                                            <PaginationItem>
                                                <PaginationNext
                                                    href={page < totalPages ? `?page=${page + 1}` : undefined}
                                                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                                                />
                                            </PaginationItem>

                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </MotionDiv>
        </main>
    );
}

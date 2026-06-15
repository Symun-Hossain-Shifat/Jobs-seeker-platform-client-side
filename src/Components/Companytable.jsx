'use client';

import React from 'react';
import { Table, Button } from '@heroui/react';
import { CircleArrowDownFill } from '@gravity-ui/icons';
import { UpdateCompany } from '@/lib/Action/PostData/update';

const CompanyTable = ({ companies }) => {
    
    // Helper to format date cleanly like "Oct 12, 2023"
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

    const handleApprove = async (id) => {
        await UpdateCompany(id, { status: 'Approved' });
    };

    const handleReject = async (id) => {
        await UpdateCompany(id, { status: 'Rejected' });
    };

    // Status mapping for visual styling
    const getStatusDetails = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return { color: 'text-emerald-500', label: 'Approved' };
            case 'rejected':
                return { color: 'text-rose-500', label: 'Rejected' };
            case 'pending':
            default:
                return { color: 'text-amber-500', label: 'Pending' };
        }
    };

    // Helper to generate initials for the placeholder icon
    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'CO';
    };

    return (
        <div className="w-full bg-[#121214] text-neutral-200 p-4 md:p-6 rounded-lg overflow-hidden">
            <Table className="bg-transparent border-none w-full layout-fixed">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Company approval management table">
                        <Table.Header>
                            <Table.Column isRowHeader className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Company Name
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800 hidden sm:table-cell">
                                Recruiter Email
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800 hidden md:table-cell">
                                Industry
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800 hidden lg:table-cell">
                                Jobs Count
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Status
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800 hidden lg:table-cell">
                                Date Submitted
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800 text-right">
                                Actions
                            </Table.Column>
                        </Table.Header>
                        
                        <Table.Body>
                            {companies.map((company) => {
                                const companyId = company._id?.$oid || company._id;
                                const statusInfo = getStatusDetails(company.status);

                                return (
                                    <Table.Row key={companyId} className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors">
                                        {/* Company Avatar & Name */}
                                        <Table.Cell className="py-4 align-middle">
                                            <div className="flex items-center gap-2 md:gap-3 min-w-[120px]">
                                                <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-neutral-800 text-neutral-300 rounded font-semibold text-xs md:text-sm tracking-wider flex-shrink-0">
                                                    {getInitials(company.name)}
                                                </div>
                                                <span className="font-medium text-neutral-200 text-xs md:text-sm truncate max-w-[100px] md:max-w-[180px]">
                                                    {company.name}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* Recruiter Email (Hidden on tiny mobile) */}
                                        <Table.Cell className="py-4 align-middle text-neutral-400 text-xs md:text-sm hidden sm:table-cell">
                                            <span className="truncate max-w-[150px] inline-block">
                                                {company.email || `recruiter@${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
                                            </span>
                                        </Table.Cell>

                                        {/* Industry Pill (Hidden on mobile) */}
                                        <Table.Cell className="py-4 align-middle hidden md:table-cell">
                                            <span className="px-2.5 py-0.5 bg-neutral-800/60 text-neutral-400 rounded-full text-xs capitalize whitespace-nowrap">
                                                {company.industry}
                                            </span>
                                        </Table.Cell>

                                        {/* Jobs Count Pill (Hidden on mobile/tablet) */}
                                        <Table.Cell className="py-4 align-middle hidden lg:table-cell">
                                            <span className="px-2.5 py-0.5 bg-neutral-800/60 text-neutral-400 rounded-full text-xs capitalize">
                                                {company.jobCount || 0}
                                            </span>
                                        </Table.Cell>

                                        {/* Status Dot */}
                                        <Table.Cell className="py-4 align-middle">
                                            <div className="flex items-center gap-1.5 min-w-[80px]">
                                                <CircleArrowDownFill className={`w-2 h-2 flex-shrink-0 ${statusInfo.color}`} />
                                                <span className={`text-xs md:text-sm font-medium ${statusInfo.color}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* Date Submitted (Hidden on mobile/tablet) */}
                                        <Table.Cell className="py-4 align-middle text-neutral-400 text-xs md:text-sm hidden lg:table-cell whitespace-nowrap">
                                            {formatDate(company.Createdat?.$date || company.Createdat)}
                                        </Table.Cell>

                                        {/* Actions Panel */}
                                        <Table.Cell className="py-4 align-middle text-right">
                                            <div className="flex justify-end gap-1 md:gap-2">
                                                {company.status?.toLowerCase() !== 'approved' && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        onClick={() => handleApprove(companyId)}
                                                        className="bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-500 border border-emerald-900/60 rounded px-2 py-1 text-[11px] md:text-xs font-medium h-7 md:h-8 transition-colors"
                                                    >
                                                        Approve
                                                    </Button>
                                                )}
                                                {company.status?.toLowerCase() !== 'rejected' && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        onClick={() => handleReject(companyId)}
                                                        className="bg-rose-950/20 hover:bg-rose-900/40 text-rose-500 border border-rose-900/40 rounded px-2 py-1 text-[11px] md:text-xs font-medium h-7 md:h-8 transition-colors"
                                                    >
                                                        Reject
                                                    </Button>
                                                )}
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default CompanyTable;
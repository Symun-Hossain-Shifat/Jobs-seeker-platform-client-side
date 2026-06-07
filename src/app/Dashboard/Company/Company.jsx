

'use client';

import React, { useState } from 'react';
import { 
    Form, 
    Fieldset, 
    TextField, 
    TextArea, 
    Label, 
    Input, 
    FieldError, 
    Select, 
    ListBox, 
    Button, 
    toast
} from '@heroui/react';
import { ArrowUpToLine, Globe, Factory, Pencil, ChevronDown, House } from '@gravity-ui/icons';
import { PostCompany } from '@/lib/Action/PostData/company';
import companybackground from '@/asset/Company.jpg'
import Image from 'next/image';



const inputClass = "w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-all placeholder:text-zinc-500";
const selectTriggerClass = "w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 flex items-center justify-between outline-none focus:border-violet-500";
const popoverClass = "bg-zinc-950 border border-zinc-700 rounded-xl p-2 shadow-2xl";
const listItemClass = "px-4 py-2.5 rounded-lg cursor-pointer hover:bg-zinc-800 text-zinc-300 data-[focused=true]:bg-zinc-800";

export default function CompanyProfile(props) {

const {id , companyName } = props
// console.log(id)
    const Datas = companyName[0]
// console.log(companyName)

    const [company, setCompany] = useState(Datas);
    const [isEditing, setIsEditing] = useState(false);
    const [logoUrl, setLogoUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [errors, setErrors] = useState({});

    // Logo Upload
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, logo: "File size must be under 5MB" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_API;
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                setLogoUrl(data.data.url);
                setErrors(prev => ({ ...prev, logo: null }));
            } else {
                setErrors(prev => ({ ...prev, logo: "Upload failed" }));
            }
        } catch {
            setErrors(prev => ({ ...prev, logo: "Upload error" }));
        } finally {
            setIsUploading(false);
        }
    };

    // Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newCompany = {
            name: formData.get('companyName'),
            websiteUrl: formData.get('websiteUrl'),
            industry: formData.get('industry') || 'Technology',
            location: formData.get('location'),
            employeeCount: formData.get('employeeCount') || '1-10 employees',
            description: formData.get('description'),
            logo: logoUrl || (company?.logo || ''),
            status: company?.status || 'Pending',
            recruiterId : id 
        };
           
        // Basic validation
        const newErrors = {};
        if (!newCompany.name) newErrors.companyName = "Company name is required";
        if (!newCompany.websiteUrl) newErrors.websiteUrl = "Website URL is required";
        if (!newCompany.location) newErrors.location = "Location is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setCompany(newCompany);
        // console.log("✅ Company Data Submitted:", newCompany);

        const result = await PostCompany(newCompany)
      console.log(result)
      toast.success(`${result?.message}`)
        setErrors({});
        setIsEditing(false);
    };

    const startRegistration = () => {
        setLogoUrl('');
        setErrors({});
        setIsEditing(true);
    };

    const startEditing = () => {
        setLogoUrl(company?.logo || '');
        setErrors({});
        setIsEditing(true);
    };

    // Empty State
    if (!company && !isEditing) {
        return (
            <div className="max-w-lg mx-auto mt-16 text-center">
                <div className="mx-auto w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center border border-zinc-800">
                    <House size={40} className="text-violet-400" />
                </div>
                <h2 className="text-3xl font-semibold text-white mt-8">No Company Yet</h2>
                <p className="text-zinc-400 mt-3 max-w-xs mx-auto">
                    Register your company to start posting jobs and managing talent.
                </p>
                <Button 
                    onPress={startRegistration}
                    className="mt-8 bg-white text-black font-semibold px-8 py-3 rounded-2xl hover:bg-zinc-100 transition"
                >
                    Register Company
                </Button>
            </div>
        );
    }

    // View Mode
    if (company && !isEditing) {
        return (
            <div className="max-w-4xl p-6 mx-auto mt-8 bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
                {/* Cover */}
                <div className="h-48 relative overflow-hidden">
                <Image
                    src={ companybackground }
                    alt="cover"
                    fill
                    className="object-cover"
                />

                {/* optional dark overlay */}
                <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="px-8 -mt-12 relative">
                    <div className="flex flex-col md:flex-row gap-6 items-end">
                        <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-zinc-950 bg-zinc-900">
                            {company.logo ? (
                                <img src={company.logo} alt="logo" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Factory size={48} className="text-zinc-600" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 pb-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl font-bold text-white">{company.name}</h1>
                                <span className={`px-4 py-1 text-sm rounded-full border ${
                                    company.status === 'Approved' 
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                }`}>
                                    {company.status}
                                </span>
                            </div>
                            <a href={`https://${company.websiteUrl}`} target="_blank" className="text-violet-400 hover:underline flex items-center gap-1.5 mt-1">
                                <Globe size={16} /> {company.websiteUrl}
                            </a>
                        </div>

                        <Button 
                            onPress={startEditing}
                            className="border border-zinc-700 text-white hover:bg-zinc-900 px-6 py-3 rounded-2xl flex items-center gap-2"
                        >
                            <Pencil size={18} /> Edit Profile
                        </Button>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5">
                            <p className="text-xs text-zinc-500">INDUSTRY</p>
                            <p className="text-white font-medium mt-1">{company.industry}</p>
                        </div>
                        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5">
                            <p className="text-xs text-zinc-500">LOCATION</p>
                            <p className="text-white font-medium mt-1">{company.location}</p>
                        </div>
                        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5">
                            <p className="text-xs text-zinc-500">TEAM SIZE</p>
                            <p className="text-white font-medium mt-1">{company.employeeCount}</p>
                        </div>
                    </div>

                    {/* Description */}
                    {company.description && (
                        <div className="mt-10">
                            <h3 className="text-lg font-semibold text-white mb-3">About the Company</h3>
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-zinc-300 leading-relaxed">
                                {company.description}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Form Mode (Registration / Edit)
    return (
        <div className="max-w-3xl mx-auto mt-8 bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <Form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-white">
                        {company ? 'Edit Company Profile' : 'Register New Company'}
                    </h2>
                    <p className="text-zinc-400 text-sm">Complete your business details</p>
                </div>

                <Fieldset className="space-y-8">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="companyName" defaultValue={company?.name || ''} isInvalid={!!errors.companyName}>
                            <Label className="text-zinc-400 text-sm mb-1.5 block">Company Name</Label>
                            <Input placeholder="e.g. Acme Corp" className={inputClass} />
                            {errors.companyName && <FieldError>{errors.companyName}</FieldError>}
                        </TextField>

                        <Select name="industry" defaultSelectedKeys={[company?.industry?.toLowerCase() || 'technology']}>
                            <Label className="text-zinc-400 text-sm mb-1.5 block">Industry</Label>
                            <Select.Trigger className={selectTriggerClass}>
                                <Select.Value />
                                <ChevronDown size={18} />
                            </Select.Trigger>
                            <Select.Popover className={popoverClass}>
                                <ListBox>
                                    <ListBox.Item id="technology" className={listItemClass}>Technology</ListBox.Item>
                                    <ListBox.Item id="finance" className={listItemClass}>Finance</ListBox.Item>
                                    <ListBox.Item id="healthcare" className={listItemClass}>Healthcare</ListBox.Item>
                                    <ListBox.Item id="design" className={listItemClass}>Design</ListBox.Item>
                                    <ListBox.Item id="marketing" className={listItemClass}>Marketing</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="websiteUrl" defaultValue={company?.websiteUrl || ''} isInvalid={!!errors.websiteUrl}>
                            <Label className="text-zinc-400 text-sm mb-1.5 block">Website URL</Label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-zinc-500">https://</span>
                                <Input placeholder="company.com" className={`${inputClass} pl-20`} />
                            </div>
                            {errors.websiteUrl && <FieldError>{errors.websiteUrl}</FieldError>}
                        </TextField>

                        <TextField name="location" defaultValue={company?.location || ''} isInvalid={!!errors.location}>
                            <Label className="text-zinc-400 text-sm mb-1.5 block">Location</Label>
                            <div className="relative">
                                <Globe size={18} className="absolute left-4 top-3.5 text-zinc-500" />
                                <Input placeholder="Dhaka, Bangladesh" className={`${inputClass} pl-11`} />
                            </div>
                            {errors.location && <FieldError>{errors.location}</FieldError>}
                        </TextField>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select name="employeeCount" defaultSelectedKeys={[company?.employeeCount || '1-10 employees']}>
                            <Label className="text-zinc-400 text-sm mb-1.5 block">Employee Count</Label>
                            <Select.Trigger className={selectTriggerClass}>
                                <Select.Value />
                                <ChevronDown size={18} />
                            </Select.Trigger>
                            <Select.Popover className={popoverClass}>
                                <ListBox>
                                    <ListBox.Item id="1-10 employees" className={listItemClass}>1-10 employees</ListBox.Item>
                                    <ListBox.Item id="11-50 employees" className={listItemClass}>11-50 employees</ListBox.Item>
                                    <ListBox.Item id="51-200 employees" className={listItemClass}>51-200 employees</ListBox.Item>
                                    <ListBox.Item id="201+ employees" className={listItemClass}>201+ employees</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        {/* Logo Upload */}
                        <div>
                            <Label className="text-zinc-400 text-sm mb-1.5 block">Company Logo</Label>
                            <label className="block cursor-pointer">
                                <div className="border border-dashed border-zinc-700 hover:border-violet-500 rounded-2xl p-6 text-center transition">
                                    {logoUrl ? (
                                        <img src={logoUrl} alt="preview" className="mx-auto h-20 w-20 object-cover rounded-xl" />
                                    ) : (
                                        <ArrowUpToLine size={32} className="mx-auto text-zinc-400" />
                                    )}
                                    <p className="text-sm text-zinc-400 mt-3">
                                        {isUploading ? 'Uploading...' : 'Click to upload logo'}
                                    </p>
                                    <p className="text-xs text-zinc-500">PNG, JPG • Max 5MB</p>
                                </div>
                                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                            </label>
                            {errors.logo && <p className="text-red-400 text-xs mt-1">{errors.logo}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <TextField name="description" defaultValue={company?.description || ''}>
                        <Label className="text-zinc-400 text-sm mb-1.5 block">Brief Description</Label>
                        <TextArea 
                            placeholder="Tell us about your mission and culture..." 
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-white min-h-[120px]"
                        />
                    </TextField>
                </Fieldset>

                <div className="flex justify-end gap-4 pt-6 border-t border-zinc-800">
                    {company && (
                        <Button 
                            type="button" 
                            variant="bordered"
                            onPress={() => setIsEditing(false)}
                            className="border-zinc-700 text-zinc-300 px-8"
                        >
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" className="bg-white text-black font-semibold px-8 hover:bg-zinc-100">
                        {company ? 'Save Changes' : 'Register Company'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
import React, { useState, useRef } from 'react';
import { 
  FamilyMember, 
  PhotoItem, 
  MemoryStory, 
  NewsAnnouncement, 
  CalendarEvent,
  FamilyArchiveData,
  ArchiveValidationResult
} from '../types';
import { 
  validateArchiveJson, 
  exportArchiveJson, 
  loadArchiveFromUrl, 
  generateStarterTemplate 
} from '../utils/jsonArchive';
import { 
  X, 
  Upload, 
  Download, 
  FileJson, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Camera, 
  BookOpen, 
  Bell, 
  Calendar, 
  Copy, 
  Sparkles, 
  Globe, 
  FileCode2,
  RefreshCw,
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface JsonArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: {
    familyMembers: FamilyMember[];
    photos: PhotoItem[];
    memories: MemoryStory[];
    news: NewsAnnouncement[];
    calendarEvents: CalendarEvent[];
  };
  onApplyArchive: (
    data: {
      familyMembers: FamilyMember[];
      photos: PhotoItem[];
      memories: MemoryStory[];
      news: NewsAnnouncement[];
      calendarEvents: CalendarEvent[];
    },
    mode: 'replace' | 'merge',
    sourceDescription?: string
  ) => void;
}

type TabType = 'upload' | 'paste' | 'remote' | 'export';

export const JsonArchiveModal: React.FC<JsonArchiveModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onApplyArchive
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('upload');
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  
  // Validation state
  const [validationResult, setValidationResult] = useState<ArchiveValidationResult | null>(null);
  const [loadMode, setLoadMode] = useState<'replace' | 'merge'>('replace');
  
  // Paste JSON state
  const [pastedJson, setPastedJson] = useState('');
  
  // Remote URL state
  const [remoteUrl, setRemoteUrl] = useState('/sample-family-archive.json');
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  // Status feedback
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleFileProcess = (file: File) => {
    setFileName(file.name);
    setSuccessToast(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const result = validateArchiveJson(content);
      setValidationResult(result);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handlePasteChange = (text: string) => {
    setPastedJson(text);
    setSuccessToast(null);
    if (text.trim()) {
      const result = validateArchiveJson(text);
      setValidationResult(result);
    } else {
      setValidationResult(null);
    }
  };

  const handleFormatPastedJson = () => {
    try {
      const parsed = JSON.parse(pastedJson);
      setPastedJson(JSON.stringify(parsed, null, 2));
    } catch (e: any) {
      alert(`Cannot format invalid JSON: ${e.message}`);
    }
  };

  const handleFetchRemoteUrl = async (urlToFetch?: string) => {
    const targetUrl = urlToFetch || remoteUrl;
    setIsLoadingUrl(true);
    setUrlError(null);
    setSuccessToast(null);

    try {
      const data = await loadArchiveFromUrl(targetUrl);
      const valResult = validateArchiveJson(data);
      setValidationResult(valResult);
      setFileName(targetUrl.split('/').pop() || 'remote_archive.json');
      setSuccessToast(`Successfully parsed archive data from "${targetUrl}"`);
    } catch (err: any) {
      setUrlError(err.message || 'Failed to fetch from URL');
      setValidationResult(null);
    } finally {
      setIsLoadingUrl(false);
    }
  };

  const handleApplyData = () => {
    if (!validationResult || !validationResult.valid || !validationResult.sanitizedData) {
      return;
    }

    const { familyMembers, photos, memories, news, calendarEvents } = validationResult.sanitizedData;
    
    onApplyArchive(
      { familyMembers, photos, memories, news, calendarEvents },
      loadMode,
      fileName || 'JSON Archive File'
    );

    triggerConfetti();
    setSuccessToast(
      `Archive loaded successfully! (${familyMembers.length} members, ${photos.length} photos, ${memories.length} stories, ${news.length} bulletins, ${calendarEvents.length} calendar dates)`
    );

    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleExportCurrent = () => {
    exportArchiveJson(currentData, `family_heritage_archive_${new Date().toISOString().split('T')[0]}.json`);
    setSuccessToast('Downloaded complete family archive JSON backup!');
  };

  const handleExportStarterTemplate = () => {
    const template = generateStarterTemplate();
    exportArchiveJson(template, 'starter_family_template.json');
    setSuccessToast('Downloaded starter family JSON template!');
  };

  const handleCopyCurrentJson = () => {
    const jsonStr = JSON.stringify(currentData, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2926]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div 
        className="artistic-frame relative bg-[#FDFBF7] w-full max-w-3xl rounded-sm shadow-2xl border border-[#2D2926]/20 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FDFBF7] border-b border-[#2D2926]/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-[#8C7355] text-white flex items-center justify-center">
              <FileJson className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-[#2D2926]">
                Family Archive Data Hub
              </h2>
              <p className="text-xs text-[#2D2926]/60">
                Load or back up all family photos, genealogy lineage, recipes, and calendar data from a single JSON file
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm bg-[#2D2926]/5 hover:bg-[#2D2926]/10 text-[#2D2926] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#2D2926]/10 bg-[#FDFBF7] px-6 pt-2 gap-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'upload' as TabType, label: 'Upload JSON File', icon: Upload },
            { id: 'paste' as TabType, label: 'Paste JSON Text', icon: FileCode2 },
            { id: 'remote' as TabType, label: 'Sample Archives / URL', icon: Globe },
            { id: 'export' as TabType, label: 'Export & Template', icon: Download }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSuccessToast(null);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'border-[#8C7355] text-[#2D2926] bg-[#8C7355]/10 rounded-t-sm shadow-2xs'
                    : 'border-transparent text-[#2D2926]/50 hover:text-[#2D2926]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Success Toast Banner */}
          {successToast && (
            <div className="p-3.5 rounded-sm bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="font-medium font-serif">{successToast}</span>
            </div>
          )}

          {/* TAB 1: UPLOAD JSON FILE */}
          {activeTab === 'upload' && (
            <div className="space-y-5">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-[#8C7355] bg-[#8C7355]/10'
                    : 'border-[#2D2926]/20 bg-[#FDFBF7] hover:border-[#8C7355]/60 hover:bg-[#2D2926]/5'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
                
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-sm bg-[#8C7355]/10 border border-[#8C7355]/30 text-[#8C7355] flex items-center justify-center mb-1">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[#2D2926]">
                    {fileName ? `Selected File: ${fileName}` : 'Choose or Drag & Drop a JSON Archive File'}
                  </h3>
                  <p className="text-xs text-[#2D2926]/60 max-w-md">
                    Upload your family archive file (.json) to instantly populate photos, family tree lineage, oral histories, recipes, and calendar dates.
                  </p>
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-[#8C7355] text-white rounded-sm">
                    Browse File (.json)
                  </span>
                </div>
              </div>

              {/* Quick Preset Buttons for fast testing */}
              <div className="flex items-center justify-between text-xs text-[#2D2926]/70 border-t border-[#2D2926]/10 pt-3">
                <span className="font-serif">Want to test with a pre-made archive?</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleFetchRemoteUrl('/sample-family-archive.json')}
                    className="text-[11px] font-bold text-[#8C7355] hover:underline cursor-pointer"
                  >
                    Load Sample Archive
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => handleFetchRemoteUrl('/starter-family-template.json')}
                    className="text-[11px] font-bold text-[#8C7355] hover:underline cursor-pointer"
                  >
                    Load Starter Template
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PASTE JSON TEXT */}
          {activeTab === 'paste' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-[#8C7355] uppercase tracking-wider">
                  Paste Raw JSON Data:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFormatPastedJson}
                    disabled={!pastedJson.trim()}
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-[#2D2926]/5 hover:bg-[#2D2926]/10 text-[#2D2926] rounded-sm cursor-pointer disabled:opacity-40"
                  >
                    Format &amp; Prettify
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPastedJson(JSON.stringify(generateStarterTemplate(), null, 2));
                      handlePasteChange(JSON.stringify(generateStarterTemplate(), null, 2));
                    }}
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-[#8C7355]/10 text-[#8C7355] hover:bg-[#8C7355]/20 rounded-sm cursor-pointer"
                  >
                    Insert Starter Sample
                  </button>
                </div>
              </div>

              <textarea
                rows={10}
                placeholder={`{\n  "familyName": "Smith Family",\n  "familyMembers": [...],\n  "photos": [...],\n  "memories": [...]\n}`}
                value={pastedJson}
                onChange={(e) => handlePasteChange(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm p-3 font-mono text-xs text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
              />
            </div>
          )}

          {/* TAB 3: REMOTE URL OR STARTER TEMPLATES */}
          {activeTab === 'remote' && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#8C7355] uppercase tracking-wider block">
                  Fetch from Static File or Remote JSON URL:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={remoteUrl}
                    onChange={(e) => setRemoteUrl(e.target.value)}
                    placeholder="https://example.com/family-archive.json or /sample-family-archive.json"
                    className="flex-1 bg-[#FDFBF7] border border-[#2D2926]/20 rounded-sm px-3.5 py-2 text-xs font-mono text-[#2D2926] focus:border-[#8C7355] focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => handleFetchRemoteUrl()}
                    disabled={isLoadingUrl || !remoteUrl.trim()}
                    className="px-4 py-2 bg-[#8C7355] hover:bg-[#735D43] text-white text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {isLoadingUrl ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Globe className="w-3.5 h-3.5" />
                    )}
                    <span>{isLoadingUrl ? 'Loading...' : 'Fetch'}</span>
                  </button>
                </div>
                {urlError && (
                  <p className="text-xs text-rose-700 font-serif flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{urlError}</span>
                  </p>
                )}
              </div>

              {/* Ready-to-use Preset Cards */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-bold text-[#8C7355] uppercase tracking-wider block">
                  Available Starter Archives:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Preset 1 */}
                  <div className="artistic-frame p-4 rounded-sm bg-[#FDFBF7] border border-[#2D2926]/10 flex flex-col justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-xs text-[#2D2926]">
                          Hawthorne Family Archive
                        </h4>
                        <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded-sm bg-[#8C7355]/10 text-[#8C7355] font-bold">
                          Full Heirloom
                        </span>
                      </div>
                      <p className="text-[11px] text-[#2D2926]/70 font-serif leading-relaxed">
                        Complete heritage repository with 7 family members across 4 generations, vintage photographs (1946–2024), oral transcripts, and cardamom apple cake recipe.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleFetchRemoteUrl('/sample-family-archive.json')}
                      className="w-full py-1.5 rounded-sm bg-[#2D2926]/5 hover:bg-[#8C7355] hover:text-white text-[#2D2926] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Load Full Archive
                    </button>
                  </div>

                  {/* Preset 2 */}
                  <div className="artistic-frame p-4 rounded-sm bg-[#FDFBF7] border border-[#2D2926]/10 flex flex-col justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-xs text-[#2D2926]">
                          Blank Starter Template
                        </h4>
                        <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 font-bold">
                          Clean Scaffold
                        </span>
                      </div>
                      <p className="text-[11px] text-[#2D2926]/70 font-serif leading-relaxed">
                        A clean minimal starting point with placeholder family branches and sample photo, designed for quick replacement with your own family records.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleFetchRemoteUrl('/starter-family-template.json')}
                      className="w-full py-1.5 rounded-sm bg-[#2D2926]/5 hover:bg-[#8C7355] hover:text-white text-[#2D2926] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Load Starter Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXPORT & BACKUP */}
          {activeTab === 'export' && (
            <div className="space-y-5">
              <div className="p-4 rounded-sm bg-[#8C7355]/5 border border-[#8C7355]/20 space-y-3">
                <div className="flex items-center gap-2 text-[#8C7355]">
                  <Download className="w-4 h-4" />
                  <h3 className="font-serif font-bold text-sm text-[#2D2926]">
                    Export &amp; Share Family Archive
                  </h3>
                </div>
                <p className="text-xs text-[#2D2926]/80 font-serif leading-relaxed">
                  Download a complete backup JSON file containing all {currentData.familyMembers.length} family members, {currentData.photos.length} photos, {currentData.memories.length} stories/recipes, bulletins, and calendar dates. You can save this file to a USB drive or share it with relatives to load on their devices.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleExportCurrent}
                    className="px-4 py-2 bg-[#8C7355] hover:bg-[#735D43] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Full Archive (.json)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyCurrentJson}
                    className="px-3.5 py-2 bg-[#2D2926]/5 hover:bg-[#2D2926]/10 text-[#2D2926] text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center gap-1.5 border border-[#2D2926]/20"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Raw JSON'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-[#FDFBF7] border border-[#2D2926]/15 space-y-2">
                <h4 className="font-serif font-bold text-xs text-[#2D2926]">
                  Download Blank Starter Template
                </h4>
                <p className="text-xs text-[#2D2926]/70 font-serif">
                  Need a clean template to edit in your favorite text editor? Download our commented JSON template with sample data schemas.
                </p>
                <button
                  type="button"
                  onClick={handleExportStarterTemplate}
                  className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#8C7355] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Download Blank Starter Template</span>
                </button>
              </div>
            </div>
          )}

          {/* INSPECTION / VALIDATION SUMMARY CARD */}
          {validationResult && (
            <div className="border border-[#2D2926]/20 rounded-sm bg-[#FDFBF7] p-4.5 space-y-4 artistic-frame">
              <div className="flex items-center justify-between border-b border-[#2D2926]/10 pb-3">
                <div className="flex items-center gap-2">
                  {validationResult.valid ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                  )}
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#2D2926]">
                      {validationResult.valid ? 'Archive File Validated' : 'JSON Format Errors Detected'}
                    </h3>
                    <p className="text-[11px] text-[#2D2926]/60">
                      {validationResult.valid 
                        ? 'Ready to apply family photos, genealogy, stories, and calendar records'
                        : 'Please fix the issues below before loading'}
                    </p>
                  </div>
                </div>

                {validationResult.valid && (
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-800">
                    Ready to Load
                  </span>
                )}
              </div>

              {/* Errors List if invalid */}
              {!validationResult.valid && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-sm text-xs text-rose-800 space-y-1">
                  {validationResult.errors.map((err, i) => (
                    <p key={i} className="flex items-center gap-1.5">
                      <span>•</span>
                      <span>{err}</span>
                    </p>
                  ))}
                </div>
              )}

              {/* Warnings List */}
              {validationResult.warnings.length > 0 && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-900 space-y-1">
                  {validationResult.warnings.map((warn, i) => (
                    <p key={i} className="flex items-center gap-1.5">
                      <span>•</span>
                      <span>{warn}</span>
                    </p>
                  ))}
                </div>
              )}

              {/* Data Breakdown Badges */}
              {validationResult.valid && (
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-[#8C7355] uppercase tracking-wider block">
                    Contents Found in JSON File:
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                    <div className="p-2.5 rounded-sm bg-[#2D2926]/5 border border-[#2D2926]/10">
                      <Users className="w-4 h-4 text-[#8C7355] mx-auto mb-1" />
                      <span className="text-base font-serif font-bold text-[#2D2926] block">
                        {validationResult.stats.membersCount}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#2D2926]/60 font-semibold">
                        Members
                      </span>
                    </div>

                    <div className="p-2.5 rounded-sm bg-[#2D2926]/5 border border-[#2D2926]/10">
                      <Camera className="w-4 h-4 text-[#8C7355] mx-auto mb-1" />
                      <span className="text-base font-serif font-bold text-[#2D2926] block">
                        {validationResult.stats.photosCount}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#2D2926]/60 font-semibold">
                        Photos
                      </span>
                    </div>

                    <div className="p-2.5 rounded-sm bg-[#2D2926]/5 border border-[#2D2926]/10">
                      <BookOpen className="w-4 h-4 text-[#8C7355] mx-auto mb-1" />
                      <span className="text-base font-serif font-bold text-[#2D2926] block">
                        {validationResult.stats.memoriesCount}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#2D2926]/60 font-semibold">
                        Stories
                      </span>
                    </div>

                    <div className="p-2.5 rounded-sm bg-[#2D2926]/5 border border-[#2D2926]/10">
                      <Bell className="w-4 h-4 text-[#8C7355] mx-auto mb-1" />
                      <span className="text-base font-serif font-bold text-[#2D2926] block">
                        {validationResult.stats.newsCount}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#2D2926]/60 font-semibold">
                        Bulletins
                      </span>
                    </div>

                    <div className="p-2.5 rounded-sm bg-[#2D2926]/5 border border-[#2D2926]/10 col-span-2 sm:col-span-1">
                      <Calendar className="w-4 h-4 text-[#8C7355] mx-auto mb-1" />
                      <span className="text-base font-serif font-bold text-[#2D2926] block">
                        {validationResult.stats.calendarEventsCount}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#2D2926]/60 font-semibold">
                        Events
                      </span>
                    </div>
                  </div>

                  {/* Load Mode Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-sm bg-[#8C7355]/5 border border-[#8C7355]/20 text-xs">
                    <span className="font-semibold text-[#2D2926]">
                      Import Method:
                    </span>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="loadMode"
                          value="replace"
                          checked={loadMode === 'replace'}
                          onChange={() => setLoadMode('replace')}
                          className="accent-[#8C7355]"
                        />
                        <span className="font-medium text-[#2D2926]">Replace All Data (Quick Setup)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="loadMode"
                          value="merge"
                          checked={loadMode === 'merge'}
                          onChange={() => setLoadMode('merge')}
                          className="accent-[#8C7355]"
                        />
                        <span className="font-medium text-[#2D2926]">Merge with Current</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <button
                    type="button"
                    onClick={handleApplyData}
                    className="w-full py-3 rounded-sm bg-[#8C7355] hover:bg-[#735D43] text-white font-bold uppercase tracking-widest text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Load Entire Family Archive into Website App</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#FDFBF7] border-t border-[#2D2926]/10 flex items-center justify-between text-[11px] text-[#2D2926]/60 shrink-0 font-serif">
          <span>All uploaded data persists in your browser localStorage automatically.</span>
          <button
            onClick={onClose}
            className="font-mono uppercase font-bold text-[#8C7355] hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Bell, 
  Settings, 
  Plus, 
  ArrowRight, 
  ChevronRight, 
  CloudUpload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Share2, 
  Globe, 
  ChevronDown, 
  Palette, 
  Database, 
  Edit3, 
  Maximize2, 
  RefreshCw, 
  Search, 
  Download,
  Image as ImageIcon,
  Presentation,
  Code,
  Link as LinkIcon,
  HelpCircle,
  FileBadge
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type View = 'landing' | 'import' | 'editor' | 'success';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header setView={setCurrentView} currentView={currentView} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'landing' && <LandingView setView={setCurrentView} key="landing" />}
          {currentView === 'import' && <DataImportView setView={setCurrentView} key="import" />}
          {currentView === 'editor' && <ChartEditorView setView={setCurrentView} key="editor" />}
          {currentView === 'success' && <ExportSuccessView setView={setCurrentView} key="success" />}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function Header({ setView, currentView }: { setView: (v: View) => void, currentView: View }) {
  return (
    <header className="sticky top-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-white border-b border-border-sand">
      <div className="flex items-center gap-10 h-full">
        <span 
          className="text-accent-orange font-black text-2xl tracking-tighter cursor-pointer"
          onClick={() => setView('landing')}
        >
          DataViz Pro
        </span>
        <nav className="hidden md:flex h-full gap-8">
          {[
            { id: 'landing', label: 'Dashboard' },
            { id: 'editor', label: 'Templates' },
            { id: 'library', label: 'Library' },
            { id: 'integrations', label: 'Integrations' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => item.id === 'landing' ? setView('landing') : null}
              className={`h-full flex items-center font-medium text-sm tracking-tight transition-all relative ${
                item.id === currentView 
                  ? 'text-text-primary' 
                  : 'text-text-primary/60 hover:text-accent-orange'
              }`}
            >
              {item.label}
              {item.id === currentView && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-accent-orange" 
                />
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="p-2 text-text-primary/60 hover:bg-surface-sand-light rounded-full transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 text-text-primary/60 hover:bg-surface-sand-light rounded-full transition-colors">
            <Settings size={20} />
          </button>
        </div>
        <div className="h-8 w-[1px] bg-border-sand"></div>
        <button 
          onClick={() => setView('import')}
          className="bg-accent-orange text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 active:opacity-80 transition-all flex items-center gap-2"
        >
          <Plus size={18} />
          Create New
        </button>
        <div className="w-10 h-10 rounded-full border border-border-sand overflow-hidden">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG-683Iq1PQOUYmBeCwNP7B9r94TzVyePPDmlRRt-nr10Kz30xZBp_-5JJQCMrTlF6s1OqLPNgeowRk6I5BoTi1u_y6gG9cEmaXdpn5ZfA9MgIrtBYWktHaflzSPq2cUp9eC0kgnsOPVh5uUfr549PBtPLjOEIPGCiDtnq9_ocC4Qs9ES4_dfrtXnSmYmxQTadWbch_tnxP5CqoEVvO6udWt6tElecx1SJZH6Y1tY5sg5D5Ed7D0yyXnr0UN1lLpT_oGPGnLwKlee5" 
            alt="User" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}

function LandingView({ setView }: { setView: (v: View) => void }) {
  const templates = [
    { title: 'Bar Chart', tags: 'Categories, Values', desc: 'Perfect for comparing discrete quantities across categories. Best for sales by region or annual revenue growth.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm2I9NZ47ywXRR-ZxTou3_EyFTzqLzi85sh3yNBY_w4Lv7fQN1RXqCE4eEs5319_Bh__sX4rxTrzhQ3aaBXFJiztTbM7EvqqjpAbOq8RBjr12IEBh3rWa448Wq-q4KGY43DIhauk_AG3OHuusednPlSRR_vVYDc05k9eeQi6spTlGvdAd8R_iO3IfrMEh7zeStoVHz4sdfou7NiXByj0asVxu6Muyibvm_mU6Shdn95p6R8WB9vLXnmvFrJR2gtultPKJYPp7VJmn9' },
    { title: 'Line Chart', tags: 'Time, Value Range', desc: 'Ideal for showing continuous trends over time. Use this to visualize stock prices, website traffic, or user retention.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlBZtcuMsY7ty7mTXiXoAse4tljtS42yYm_Ef840VlHB2cvvgt9cY3RNOwKppa566hsvhyOxXCFnytG-tpElOmjsGYYDcpMOFhIBjHiSU_QDxEQY2QTKG3ijkNUAbgVR5INKehc_OeE1YOJQGGR633xIDGHIODBgHiuHR-hxgxG5MvrKxTOAtGWBN0rvXMoxqVKUIRg_xnJY09sLVrdynegBTcxG132FGmT4wsYQQnNs2Vh0xqXxQnkJbHIhUffCmXjzLtOfk92W15' },
    { title: 'Pie Chart', tags: 'Segments, Percentages', desc: 'Visualizes parts of a whole. Excellent for showing budget allocation or market share distribution.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtNnbGrjfjS7GrsHwUXTE0b9bvRMLx9oEFpcANkOqP9P57sYMRfCJWwnumKW-ZRhU4yZE4QPyJhhUaMeaIn3Jlrl1T_Mfm1JyaSh8XxnNNAF92DatmjNeVVpwj8APUqsFRKpQury9l3PnwhcloQiTq91I6jtAl7BZw-82qQg4t_jTGBfKm1PJwnTE_9WizoVuCGKqfXbfz3zgC2XyOm_kJzS3S-HypNIlbfE6sgSQ2terPP3WpuIql8JWPuibXIRwjMqZXLOzGO6LL' },
    { title: 'Donut Chart', tags: 'Metric, Total', desc: 'A variation of the pie chart with a hole in the center, perfect for highlighting a primary KPI in the middle.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn-5-Ur0NY4SsoLSR0eGCVQFWJj2mx5KxwuSr73Va9R4Pwjeus6UjhW39V8u-OgaI6ZNK_VDWeEdUR2UzHAV8h3thix6Ujr6-KPpp4Kumhuzy2hFYOViTjxTwLYF07uw20IzefDSYk_DEzssE2R2CUIQqZGKRJ7pr5gTOHUc6Tt6ywnBw1YxpjAxd5KZy21OWKyPuaFRV0Gze-RcUJNf1-ERAj8TXzuObky2EQKiG5SeW7g6KIjQMIWOvW0sNs2HqwmHK02CuOJrXZ' },
    { title: 'Scatter Plot', tags: 'X-Axis, Y-Axis, Size', desc: 'Used to show correlations between variables. Perfect for R&D data or identifying clusters in customer behavior.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXFlAjdeCignBIylOlSNtvZG-QGs0drhWqAVq9rF83EZTcs_avlSkWBsul0CIPZa4dzLrF1r0P_ylK3SG_lFJKjM4_xYgI7l2E-uka9CkkzcMk7wqX0Y2RXTxUQ4JBHaS0JvaYg1O_K8JnpW9nKEgn9c4euVU8vufsldVTDHkPH1EzxDQ9c6umE2mOswT0CTr_wAB48xhOX55Z1Q7pNr1ZqlpckL0IGvF9U6RqJmaavStReDHAKpNzPCM2IVrd0Uzl7FFAK_MfaIXk' },
    { title: 'Radar Chart', tags: 'Attributes, Ratings', desc: 'Compares multiple quantitative variables. Best for employee skill assessment or product feature comparisons.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuY0nYGQJUVEW4t-uVUDQDnyfPZxP3mOt0igKBQ0xA861g0I0LQHF_pe-5Os0jQk7hSZZfDp2Wstcke8t0qdq2Y9Z1TTW3IwZS6sTwlpCPXp4I5QXyH7Rl58tkdlwiYwPVc8_H3eQu4UtQztUShywkxUv12SKJH6j-0tQpszb5OLHVDNC97kUWFrLdp3-pwFjY3h695wpAOyth_vWXTpbEBDm1h-UtK8J3vno-lMX4X-rhhIAmKDkyBwqQQsTPgs7mmrDIae1mXkPb' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="bg-canvas-cream py-24 border-b border-border-sand">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-medium leading-[1.1] text-text-primary mb-8 tracking-tight">
              Upload Data, Choose a Template, Generate Professional Charts Instantly
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mb-12 font-normal leading-relaxed">
              Turn your raw data into boardroom-ready visuals in seconds. Our tactile, border-forward design system ensures your clarity is never compromised.
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setView('import')}
                className="bg-text-primary text-white px-8 py-5 rounded-xl font-semibold hover:bg-black transition-all"
              >
                Get Started Free
              </button>
              <button className="bg-surface-sand-light text-text-primary border border-border-sand px-8 py-5 rounded-xl font-semibold hover:bg-border-sand transition-all">
                View Live Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-canvas-off-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-sm font-bold text-accent-orange block mb-3 uppercase tracking-wider">Gallery</span>
              <h2 className="text-5xl font-medium text-text-primary tracking-tight">Standard Template Library</h2>
            </div>
            <div className="flex border border-border-sand rounded-xl p-1 bg-white">
              <button className="px-5 py-2 bg-surface-sand-light text-text-primary font-semibold rounded-lg text-sm">All Charts</button>
              <button className="px-5 py-2 text-text-secondary/60 font-semibold hover:text-text-primary rounded-lg text-sm transition-colors">Popular</button>
              <button className="px-5 py-2 text-text-secondary/60 font-semibold hover:text-text-primary rounded-lg text-sm transition-colors">Specialized</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-canvas-cream border border-border-sand rounded-[4px] p-8 card-hover transition-all flex flex-col group cursor-pointer"
                onClick={() => setView('import')}
              >
                <div className="aspect-video mb-8 border border-border-sand rounded-[4px] overflow-hidden bg-white shadow-sm">
                  <img 
                    src={t.img} 
                    alt={t.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-[12px] font-bold text-text-secondary/60 uppercase tracking-widest mb-3">{t.tags}</span>
                <h3 className="text-2xl font-bold text-text-primary mb-4">{t.title}</h3>
                <p className="text-[15px] text-text-secondary mb-8 flex-grow leading-relaxed">
                  {t.desc}
                </p>
                <button className="text-accent-orange font-bold flex items-center gap-2 hover:translate-x-1 transition-transform uppercase text-xs tracking-widest">
                  Use Template <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-text-primary text-white">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <h2 className="font-serif text-6xl mb-8 font-light italic">Start building your story today.</h2>
          <p className="text-xl text-border-sand mb-12 max-w-xl mx-auto font-normal opacity-80">
            No credit card required. Import your CSV, JSON, or SQL data and get started with our professional templates.
          </p>
          <button 
            onClick={() => setView('import')}
            className="bg-accent-orange text-white px-10 py-5 rounded-lg font-bold text-lg hover:opacity-90 active:scale-95 transition-all"
          >
            Create My First Visualization
          </button>
        </div>
      </section>
    </motion.div>
  );
}

function DataImportView({ setView }: { setView: (v: View) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-[1200px] mx-auto px-8 py-20"
    >
      <nav className="flex items-center gap-2 text-[#939084] mb-6 font-bold text-[12px] uppercase tracking-widest">
        <span className="hover:text-accent-orange cursor-pointer" onClick={() => setView('landing')}>Project Alpha</span>
        <ChevronRight size={14} />
        <span className="text-text-primary">Data Import</span>
      </nav>
      
      <div className="mb-12">
        <h1 className="text-5xl font-medium mb-6 leading-tight">
          Upload your data for the <span className="text-accent-orange italic font-serif">Interactive Sales Heatmap</span>
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl font-normal">
          Connect your raw data sources. We'll help you map your fields to the template requirements for optimal visualization performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-10">
          <div className="border-2 border-dashed border-border-sand rounded-2xl bg-canvas-cream p-16 flex flex-col items-center justify-center text-center hover:bg-surface-sand-light transition-all cursor-pointer group">
            <div className="w-20 h-20 bg-surface-sand-light rounded-full flex items-center justify-center mb-8 border border-border-sand group-hover:bg-accent-orange/10 group-hover:border-accent-orange transition-colors">
              <CloudUpload size={40} className="text-text-secondary/60 group-hover:text-accent-orange" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Ready to visualize?</h3>
            <p className="text-text-secondary mb-10 text-[16px]">Drag and drop Excel or CSV files here, or click to browse</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-accent-orange text-white px-8 py-3 font-semibold rounded-[4px] shadow-sm hover:opacity-90 transition-opacity">
                Select File
              </button>
              <button className="bg-surface-sand-light text-text-primary border border-border-sand px-8 py-3 font-semibold rounded-xl hover:bg-border-sand transition-colors">
                Connect Google Sheets
              </button>
            </div>
            <p className="mt-8 text-text-secondary/40 text-[11px] font-bold uppercase tracking-widest">
              Supported formats: .csv, .xlsx, .json (Max 50MB)
            </p>
          </div>

          <div className="bg-white border border-border-sand rounded-xl p-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-surface-sand-light border border-border-sand rounded-xl flex items-center justify-center">
                <FileText size={24} className="text-text-secondary/60" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary">Need a starting point?</h4>
                <p className="text-text-secondary/60 text-sm font-medium">Download our pre-formatted standard data template.</p>
              </div>
            </div>
            <button className="bg-surface-sand-light border border-border-sand text-text-primary font-bold py-4 px-8 rounded-xl hover:bg-border-sand transition-colors whitespace-nowrap uppercase text-[12px] tracking-widest">
              Download Template
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-border-sand rounded-xl overflow-hidden shadow-sm">
            <div className="bg-surface-sand-light/30 px-6 py-5 border-b border-border-sand flex items-center justify-between">
              <h3 className="font-bold text-text-primary flex items-center gap-3 uppercase text-xs tracking-widest">
                <CheckCircle2 size={18} className="text-accent-orange" />
                Field Mapping Validation
              </h3>
              <span className="bg-red-100 text-red-600 text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider">1 Error</span>
            </div>
            <div className="overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-background-soft text-text-secondary/40 text-[10px] font-black uppercase tracking-widest border-b border-border-sand">
                    <th className="px-6 py-4">Template Field</th>
                    <th className="px-6 py-4">Uploaded Field</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-sand">
                  {[
                    { t: 'Customer_ID', u: 'user_guid', s: 'done' },
                    { t: 'Revenue', u: 'total_sales_usd', s: 'done' },
                    { t: 'Region', u: 'geo_location', s: 'done' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-background-soft transition-colors">
                      <td className="px-6 py-5 text-sm font-bold">{row.t}</td>
                      <td className="px-6 py-5 text-sm text-text-secondary italic">{row.u}</td>
                      <td className="px-6 py-5 text-right">
                        <CheckCircle2 size={20} className="text-green-600 inline ml-auto" fill="currentColor" fillOpacity={0.2} />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-red-50 hover:bg-red-100/50 transition-colors">
                    <td className="px-6 py-5 text-sm font-bold">Date</td>
                    <td className="px-6 py-5 text-sm text-red-600 italic">-- Not Found --</td>
                    <td className="px-6 py-5 text-right">
                      <AlertCircle size={20} className="text-red-500 inline ml-auto" fill="currentColor" fillOpacity={0.2} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="m-6 p-5 bg-red-50 border border-red-200 rounded-xl flex gap-4 items-start">
              <AlertCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-red-700">Missing required field: 'Date'</p>
                <p className="text-xs text-red-600/80 mt-1 font-medium leading-relaxed">
                  Please ensure your CSV contains a column labeled 'Date' or 'Timestamp' to enable time-series visualization.
                </p>
              </div>
            </div>

            <div className="px-6 py-8 border-t border-border-sand flex flex-col gap-4">
              <button 
                onClick={() => setView('editor')}
                className="w-full bg-accent-orange text-white px-8 py-4 font-bold rounded-[4px] active:opacity-80 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
              >
                Continue to Editor
                <ArrowRight size={16} />
              </button>
              <button className="w-full border border-border-sand text-text-secondary hover:bg-surface-sand-light py-4 font-bold rounded-xl transition-colors uppercase text-xs tracking-widest">
                Re-upload different file
              </button>
            </div>
          </div>

          <div className="p-8 bg-text-primary rounded-2xl border border-border-sand text-white">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb size={20} className="text-accent-orange" />
              <h4 className="font-bold text-xs uppercase tracking-widest">Pro Tip</h4>
            </div>
            <p className="text-sm text-border-sand/70 leading-relaxed font-medium">
              You can map custom fields to our template directly in the next step. If your dates are in a non-standard format (e.g. DD-MM-YY), our AI engine will attempt to auto-parse them.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ChartEditorView({ setView }: { setView: (v: View) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-[calc(100vh-80px)] overflow-hidden"
    >
      <aside className="w-1/4 border-r border-border-sand bg-canvas-cream flex flex-col overflow-hidden">
        <div className="p-8 border-b border-border-sand">
          <h2 className="text-2xl font-bold text-text-primary">Chart Editor</h2>
          <p className="text-text-secondary/40 text-[10px] font-black mt-2 uppercase tracking-[0.2em]">CONFIGURE YOUR VISUALIZATION</p>
        </div>
        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12">
          <EditorSection icon={<Edit3 size={18} />} title="Basic Info">
            <EditorField label="CHART TITLE">
              <input 
                className="w-full bg-white border border-border-sand rounded-[5px] px-4 py-3 focus:ring-1 focus:ring-accent-orange focus:border-accent-orange outline-none transition-all text-sm font-medium" 
                type="text" 
                defaultValue="Quarterly Revenue Growth" 
              />
            </EditorField>
            <EditorField label="SUBTITLE">
              <input 
                className="w-full bg-white border border-border-sand rounded-[5px] px-4 py-3 focus:ring-1 focus:ring-accent-orange focus:border-accent-orange outline-none transition-all text-sm font-medium" 
                placeholder="e.g. FY2024 Performance Metrics" 
                type="text" 
              />
            </EditorField>
          </EditorSection>

          <hr className="border-border-sand" />

          <EditorSection icon={<Database size={18} />} title="Data Mapping">
            <EditorField label="X-AXIS (DIMENSION)">
              <div className="relative">
                <select className="w-full bg-white border border-border-sand rounded-[5px] px-4 py-3 appearance-none focus:ring-1 focus:ring-accent-orange focus:border-accent-orange outline-none transition-all text-sm font-medium">
                  <option>Fiscal Month</option>
                  <option>Product Category</option>
                  <option>Region</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary/50 pointer-events-none" />
              </div>
            </EditorField>
            <EditorField label="Y-AXIS (MEASURE)">
              <div className="relative">
                <select className="w-full bg-white border border-border-sand rounded-[5px] px-4 py-3 appearance-none focus:ring-1 focus:ring-accent-orange focus:border-accent-orange outline-none transition-all text-sm font-medium">
                  <option>Total Revenue (USD)</option>
                  <option>Units Sold</option>
                  <option>Conversion Rate</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary/50 pointer-events-none" />
              </div>
            </EditorField>
          </EditorSection>

          <hr className="border-border-sand" />

          <EditorSection icon={<Palette size={18} />} title="Visuals">
            <EditorField label="COLOR THEME">
              <div className="flex flex-wrap gap-2">
                {['Zapier Warm', 'Oceanic Blue', 'Forest Green', 'Monochrome'].map((t, i) => (
                  <button 
                    key={t}
                    className={`px-3 py-2 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all ${
                      i === 0 ? 'border-accent-orange bg-accent-orange/5 text-accent-orange' : 'border-border-sand bg-surface-sand-light text-text-secondary'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </EditorField>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-bold text-text-primary uppercase tracking-widest text-[11px]">Show Data Labels</span>
              <Toggle checked={true} />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-bold text-text-primary uppercase tracking-widest text-[11px]">Enable Gridlines</span>
              <Toggle checked={true} />
            </div>
          </EditorSection>
        </div>
        <div className="p-8 border-t border-border-sand bg-white/50 space-y-4">
           <button 
            onClick={() => setView('success')}
            className="w-full bg-accent-orange text-white py-4 rounded-[4px] font-bold uppercase text-xs tracking-[0.2em] hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
           >
             Export Final Chart
           </button>
           <button className="w-full border border-border-sand text-text-secondary/60 py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-surface-sand-light transition-all">
             Save as Draft
           </button>
        </div>
      </aside>

      <section className="flex-1 bg-[#faf9f6] p-16 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#201515 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <motion.div 
          layoutId="chart-preview"
          className="w-full max-w-5xl bg-white border border-border-sand rounded-xl p-16 flex flex-col shadow-xl relative z-10"
        >
          <div className="mb-16">
            <h1 className="text-4xl font-medium text-text-primary tracking-tight">Quarterly Revenue Growth</h1>
            <p className="text-text-secondary/60 font-medium mt-3 text-lg leading-relaxed">Comparison across all sales channels for the current fiscal year</p>
          </div>
          
          <div className="relative h-[450px] w-full flex items-end justify-between px-8 pb-12 border-b border-border-sand">
            {/* Gridlines */}
            {[100, 75, 50, 25, 0].map((val) => (
              <div key={val} className="absolute w-full border-t border-border-sand/30 transition-all flex justify-end" style={{ bottom: `${(val / 100) * 450 + 48}px` }}>
                {val > 0 && <span className="text-[10px] font-bold text-text-secondary/40 pr-4 -translate-y-2 uppercase tracking-widest">{val}k</span>}
              </div>
            ))}

            {/* Bars */}
            <div className="flex flex-col items-center gap-6 w-20 relative z-10 group">
              <motion.div initial={{ height: 0 }} animate={{ height: 180 }} className="w-14 bg-accent-orange rounded-t-[2px] shadow-sm relative overflow-hidden group-hover:brightness-110 transition-all">
                 <div className="absolute inset-0 opacity-10 bg-white group-hover:opacity-20 transition-opacity"></div>
              </motion.div>
              <span className="font-bold text-text-secondary uppercase tracking-[0.2em] text-[10px]">Q1</span>
            </div>

            <div className="flex items-end gap-2 w-32 relative z-10 group">
              <motion.div initial={{ height: 0 }} animate={{ height: 320 }} className="w-14 bg-accent-orange rounded-t-[2px] transition-all group-hover:brightness-110 shadow-sm"></motion.div>
              <motion.div initial={{ height: 0 }} animate={{ height: 160 }} className="w-14 bg-text-primary/90 rounded-t-[2px] transition-all group-hover:brightness-110 shadow-sm"></motion.div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-bold text-text-secondary uppercase tracking-[0.2em] text-[10px]">Q2</div>
            </div>

            <div className="flex flex-col items-center gap-6 w-20 relative z-10 group">
              <motion.div initial={{ height: 0 }} animate={{ height: 380 }} className="w-14 bg-accent-orange rounded-t-[2px] shadow-sm group-hover:brightness-110 transition-all"></motion.div>
              <span className="font-bold text-text-secondary uppercase tracking-[0.2em] text-[10px]">Q3</span>
            </div>

            <div className="flex items-end gap-2 w-32 relative z-10 group">
              <motion.div initial={{ height: 0 }} animate={{ height: 280 }} className="w-14 bg-accent-orange rounded-t-[2px] transition-all group-hover:brightness-110 shadow-sm"></motion.div>
              <motion.div initial={{ height: 0 }} animate={{ height: 210 }} className="w-14 bg-text-primary/90 rounded-t-[2px] transition-all group-hover:brightness-110 shadow-sm"></motion.div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-bold text-text-secondary uppercase tracking-[0.2em] text-[10px]">Q4</div>
            </div>

            {/* Trend Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none px-8 pb-12 overflow-visible" viewBox="0 0 800 450" preserveAspectRatio="none">
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                d="M 50 250 L 250 180 L 450 60 L 700 110" 
                fill="none" 
                stroke="#ff4f00" 
                strokeWidth="3" 
                strokeDasharray="10,6"
                className="opacity-40"
              />
            </svg>
          </div>

          <div className="mt-20 flex justify-center gap-12">
            <LegendItem color="bg-accent-orange" label="Direct Sales" />
            <LegendItem color="bg-text-primary" label="Partner Network" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 border-t-2 border-dashed border-accent-orange opacity-40"></div>
              <span className="text-[10px] font-black text-text-secondary/60 uppercase tracking-[0.2em]">Market Trend</span>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center bg-text-primary rounded-full px-8 py-4 shadow-2xl gap-8 z-20">
          <ControlButton icon={<Search size={18} />} label="Zoom" />
          <div className="w-[1px] h-5 bg-white/10"></div>
          <ControlButton icon={<RefreshCw size={18} />} label="Refresh" />
          <div className="w-[1px] h-5 bg-white/10"></div>
          <ControlButton icon={<Maximize2 size={18} />} label="Full" />
        </div>
      </section>
    </motion.div>
  );
}

function ExportSuccessView({ setView }: { setView: (v: View) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-[1200px] mx-auto px-8 py-24 flex flex-col items-center"
    >
      <div className="text-center mb-16 space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-orange text-white rounded-full mb-4 shadow-lg shadow-accent-orange/20">
          <CheckCircle2 size={40} fill="currentColor" fillOpacity={0.2} />
        </div>
        <h1 className="text-5xl font-medium text-text-primary tracking-tight">Your chart is ready!</h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto font-normal">
          Perfectly calculated, beautifully rendered, and ready to share with the world.
        </p>
      </div>

      <div className="w-full max-w-5xl mb-24">
        <div className="bg-white border border-border-sand rounded-xl p-6 shadow-xl relative overflow-hidden group">
          <div className="aspect-video w-full relative rounded-lg overflow-hidden border border-border-sand">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvI5cIm2RsIj00h74WBE7b90cCS9oC7rY-GJk5Xbu0bGx6d8vHSVsQqJ-qtQtA0YbMZxYKI76SojVPzz520_St22fVFQjZmgYKERuAsqBbnY7cCFHTbCOO8B2fQtejdsEVAQT6DZUDTmNOW1Gw3AzZT13bswlD366_ZUqBwS-8aRrUvzGO-fq2maVhqQXo8OTIASnrccbXg3npTAWUhD3eBK04uV7SIzbE7m93Ah5cpDL5mH7ov4h3ECwyQnkH23ErmRcVdBK_pLtG" 
              alt="Preview" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-end p-10">
              <div className="flex gap-4">
                <span className="px-4 py-2 bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-widest rounded-full border border-border-sand shadow-sm">Q4 Revenue Report</span>
                <span className="px-4 py-2 bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-widest rounded-full border border-border-sand shadow-sm">Generated 2m ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 w-full">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b border-border-sand pb-6">
            <h2 className="text-2xl font-bold text-text-primary">Export Formats</h2>
            <span className="text-[10px] font-black text-text-secondary/40 uppercase tracking-[0.2em]">Recommended: SVG</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { id: 'PNG', icon: <ImageIcon size={24} /> },
              { id: 'JPG', icon: <ImageIcon size={24} /> },
              { id: 'SVG', icon: <FileBadge size={24} />, active: true },
              { id: 'PDF', icon: <FileText size={24} /> },
              { id: 'PPTX', icon: <Presentation size={24} /> }
            ].map((f) => (
              <button 
                key={f.id}
                className={`flex flex-col items-center justify-center p-8 border transition-all active:scale-[0.98] group rounded-[4px] bg-white ${
                  f.active 
                    ? 'border-accent-orange ring-1 ring-accent-orange' 
                    : 'border-border-sand hover:border-accent-orange hover:shadow-md'
                }`}
              >
                <div className={`${f.active ? 'text-accent-orange' : 'text-text-secondary/40 group-hover:text-accent-orange'} mb-4 transition-colors`}>
                  {f.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${f.active ? 'text-text-primary' : 'text-text-secondary/60'}`}>{f.id}</span>
              </button>
            ))}
          </div>
          <div className="pt-10 flex flex-wrap gap-6">
            <button className="flex-grow sm:flex-none flex items-center justify-center gap-3 bg-text-primary text-white px-10 py-5 rounded-xl font-bold hover:bg-black transition-all uppercase text-[12px] tracking-widest">
              <LinkIcon size={18} />
              Share via Link
            </button>
            <button className="flex-grow sm:flex-none flex items-center justify-center gap-3 bg-white border border-border-sand text-text-primary px-10 py-5 rounded-xl font-bold hover:bg-surface-sand-light transition-all uppercase text-[12px] tracking-widest">
              <Code size={18} />
              Embed in Website
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-surface-sand-light h-full border border-border-sand rounded-xl p-10 flex flex-col gap-10 justify-center shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 overflow-hidden blur-3xl"></div>
            <div className="space-y-4 relative z-10">
              <h3 className="text-2xl font-bold">Ready to go?</h3>
              <p className="text-text-secondary/80 font-medium leading-relaxed">Download your high-resolution SVG asset instantly.</p>
            </div>
            <button className="w-full bg-accent-orange text-white px-8 py-5 rounded-[4px] font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-accent-orange/20 active:scale-[0.97] transition-all uppercase tracking-widest">
              <Download size={24} />
              Download Now
            </button>
            <div className="flex flex-col gap-5 pt-4 border-t border-border-sand/40 relative z-10">
              <button 
                onClick={() => setView('import')}
                className="flex items-center gap-3 text-accent-orange font-bold hover:underline group text-xs uppercase tracking-widest"
              >
                <Plus size={16} />
                Create Another Chart
              </button>
              <button 
                onClick={() => setView('landing')}
                className="flex items-center gap-3 text-text-secondary/60 font-bold hover:text-text-primary transition-colors text-xs uppercase tracking-widest"
              >
                <HelpCircle size={16} />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Helper Components
function EditorSection({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 text-text-secondary/80">
        <span className="text-accent-orange">{icon}</span>
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">{title}</h3>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function EditorField({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <label className="block text-[9px] font-black text-text-secondary/40 uppercase tracking-[0.2em]">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ checked }: { checked: boolean }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
      <div className="w-10 h-5 bg-border-sand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-orange"></div>
    </label>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-3.5 h-3.5 ${color} rounded-full`}></div>
      <span className="text-[10px] font-black text-text-secondary/60 uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}

function ControlButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center gap-3 text-white/60 hover:text-white transition-all group">
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-[9px] font-black uppercase tracking-[0.2em]">{label}</span>
    </button>
  );
}

function Footer() {
  return (
    <footer className="w-full py-20 px-8 flex flex-col md:flex-row justify-between items-center gap-10 bg-text-primary border-t border-white/5">
      <div className="flex flex-col items-center md:items-start gap-5">
        <span className="text-white font-black text-2xl tracking-tighter">DataViz Pro</span>
        <p className="text-[11px] font-bold uppercase tracking-widest text-border-sand/40">© 2024 DataViz. Built for clarity.</p>
      </div>
      <nav className="flex flex-wrap justify-center gap-10">
        {['Documentation', 'API Reference', 'Status', 'Privacy Policy', 'Terms'].map((l) => (
          <button key={l} className="text-[11px] font-bold uppercase tracking-widest text-border-sand/40 hover:text-accent-orange transition-colors">
            {l}
          </button>
        ))}
      </nav>
      <div className="flex gap-4">
        <CircleBtn icon={<Share2 size={18} />} />
        <CircleBtn icon={<Globe size={18} />} />
      </div>
    </footer>
  );
}

function CircleBtn({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-border-sand/40 hover:border-accent-orange hover:text-accent-orange transition-all active:scale-95">
      {icon}
    </button>
  );
}

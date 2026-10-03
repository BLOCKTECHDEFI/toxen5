import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Bot, Check, ChevronRight, CircleDot, Cpu, ExternalLink,
  Gauge, Menu, MessageSquare, Play, Search, Shield, Sparkles, Target,
  Terminal, TrendingUp, Wallet, X, Zap
} from "lucide-react";
import logo from "./assets/logo.svg";
import "./styles.css";

const agentData = [
  { name: "Momentum", type: "EXECUTION", risk: "MEDIUM", pnl: "+18.42%", color: "silver", desc: "Trend-aware execution agent that scales entries as momentum confirms." },
  { name: "VaultGuard", type: "RISK", risk: "LOW", pnl: "+8.91%", color: "dark", desc: "Portfolio protection agent with hard allocation and drawdown limits." },
  { name: "DCA Engine", type: "AUTOMATION", risk: "LOW", pnl: "+12.08%", color: "silver", desc: "Gas-aware recurring execution with adaptive order timing." },
  { name: "CopyNode", type: "SOCIAL", risk: "HIGH", pnl: "+31.64%", color: "dark", desc: "Mirrors selected onchain wallets with configurable safety rails." }
];

const logs = [
  ["04:21:08", "ROUTE", "RBN → USDC", "OPTIMAL"],
  ["04:21:10", "ORACLE", "Price trigger confirmed", "VALID"],
  ["04:21:11", "SIM", "Slippage 0.18%", "PASS"],
  ["04:21:12", "EXEC", "Payload submitted", "LIVE"]
];

function App() {
  const [menu, setMenu] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(agentData[0]);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [wallet, setWallet] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const prompt = 'Buy 500 USDC of RBN if price drops below $2.50 today. Never use more than 5% of my portfolio.';

  const copyPrompt = async () => {
    try { await navigator.clipboard.writeText(prompt); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const nav = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <div className="grain" />
      <header className={scrolled ? "nav scrolled" : "nav"}>
        <button className="brand" onClick={() => nav("home")} aria-label="Toxen home">
          <img src={logo} alt="Toxen logo" />
          <span>TOXEN</span>
        </button>
        <div className="navRight">
          <a className="xlink" href="https://x.com/toxen_agent" target="_blank" rel="noreferrer">𝕏</a>
          <button className="walletBtn" onClick={() => setWallet(!wallet)}>
            <Wallet size={15} /> {wallet ? "CONNECTED" : "CONNECT"}
          </button>
          <button className="menuBtn" onClick={() => setMenu(true)}><Menu size={16}/> MENU</button>
        </div>
      </header>

      {wallet && <div className="toast"><CircleDot size={13}/> Demo wallet connected · 0x7A…42F</div>}

      <div className={menu ? "overlay show" : "overlay"} onClick={() => setMenu(false)}>
        <div className="menuPanel" onClick={e => e.stopPropagation()}>
          <div className="menuTop">
            <div className="brand"><img src={logo} alt="" /><span>TOXEN</span></div>
            <button className="closeBtn" onClick={() => setMenu(false)}>CLOSE <X size={15}/></button>
          </div>
          <div className="menuLinks">
            {[
              ["HOME","home"],["HOW IT WORKS","how-it-works"],["FEATURES","features"],["AI AGENTS","agents"],["DOCS","docs"]
            ].map(([label,id]) => <button key={id} onClick={() => nav(id)}>{label}<ChevronRight size={25}/></button>)}
          </div>
          <div className="menuBottom">© 2026 TOXEN PROTOCOL <span>@TOXEN_AGENT</span></div>
        </div>
      </div>

      <main>
        <section id="home" className="hero section">
          <div className="heroGlow" />
          <div className="heroGrid" />
          <div className="heroInner">
            <div className="eyebrow"><span className="pulse" /> AUTONOMOUS ONCHAIN EXECUTION</div>
            <div className="heroCopy">
              <div>
                <h1>EXECUTE<br/>WITHOUT<br/><em>HESITATION.</em></h1>
                <p>Build wealth like the 1%. Turn plain English into autonomous execution on Robinhood Chain.</p>
                <div className="heroActions">
                  <button className="primary" onClick={() => setAgentOpen(true)}>GET YOUR AGENT <ArrowRight size={18}/></button>
                  <button className="square" onClick={() => setTerminalOpen(true)} aria-label="Open live terminal"><Terminal size={19}/></button>
                  <button className="square" onClick={() => nav("how-it-works")} aria-label="How it works"><Play size={18}/></button>
                </div>
              </div>
              <div className="metalCardWrap">
                <div className="metalCard">
                  <div className="cardSheen" />
                  <div className="cardTop"><span className="miniBrand"><img src={logo} alt=""/> TOXEN</span><span>ROBINHOOD L2</span></div>
                  <div className="cardCenter"><span>AGENT</span><strong>ACTIVE</strong></div>
                  <div className="cardBottom"><span>∞</span><span>07 / 26</span></div>
                </div>
                <div className="orbit o1" /><div className="orbit o2" />
              </div>
            </div>
            <div className="stats">
              {[["$3M+","TRANSACTIONAL"],["7,500+","AGENTS LIVE"],["$5M+","TOTAL VOLUME"],["99.8%","UPTIME"]].map(([v,l]) =>
                <div className="stat" key={l}><strong>{v}</strong><span>{l}</span></div>
              )}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section darkSection">
          <div className="container">
            <div className="sectionHead"><div><span className="kicker">01 / WORKFLOW</span><h2>COMMAND.<br/><span>CONFIRM.</span> EXECUTE.</h2></div><p>Toxen strips away the friction between intent and onchain action. Describe what you want. Your agent handles the machinery.</p></div>
            <div className="steps">
              {[
                [MessageSquare,"01","NATURAL LANGUAGE","Tell Toxen what you want in plain English. No protocol knowledge required."],
                [Cpu,"02","AI ESCROW + MONITOR","Funds remain bounded by your rules while the agent watches triggers, liquidity and execution conditions."],
                [Target,"03","PRECISION EXECUTION","When every condition passes, the agent submits the transaction and reports the result."]
              ].map(([Icon,num,title,desc]) =>
                <article className="stepCard" key={num}><span className="stepNum">{num}</span><Icon size={30}/><h3>{title}</h3><p>{desc}</p><div className="cardArrow"><ArrowRight size={17}/></div></article>
              )}
            </div>
          </div>
        </section>

        <section id="features" className="section featureSection">
          <div className="container">
            <div className="sectionHead"><div><span className="kicker">02 / INFRASTRUCTURE</span><h2>BUILT FOR<br/><span>THE EXECUTION LAYER.</span></h2></div><button className="textBtn" onClick={() => setTerminalOpen(true)}>OPEN TERMINAL <ArrowRight size={15}/></button></div>
            <div className="featureGrid">
              <article className="feature big"><div className="featureIcon"><Zap/></div><span className="featureTag">AUTOMATION</span><h3>GAS-AWARE DCA</h3><p>Schedule recurring buys around network conditions. Toxen handles timing, sizing and execution.</p><div className="miniChart"><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
              <article className="feature"><div className="featureIcon"><Shield/></div><span className="featureTag">RISK CONTROL</span><h3>COPY-TRADE SHIELD</h3><p>Mirror selected wallets while enforcing hard portfolio limits and token exposure rules.</p><div className="riskBar"><span>ALLOCATION</span><b>5.0%</b></div><div className="bar"><i/></div></article>
              <article className="feature wide"><div><div className="featureIcon"><TrendingUp/></div><span className="featureTag">ROUTING ENGINE</span><h3>DEEP LIQUIDITY ROUTING</h3><p>Compare available routes and simulate the payload before your agent commits.</p></div><div className="terminalMini"><div className="termTitle"><span>LIVE / EXECUTION LOG</span><CircleDot size={11}/></div>{logs.map(x => <div className="log" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b><span>{x[2]}</span><em>{x[3]}</em></div>)}</div></article>
            </div>
          </div>
        </section>

        <section id="agents" className="section darkSection">
          <div className="container">
            <div className="sectionHead"><div><span className="kicker">03 / AGENT MARKETPLACE</span><h2>DEPLOY A<br/><span>NEW BRAIN.</span></h2></div><p>Start with a preconfigured agent, then tune its rules to your own execution style.</p></div>
            <div className="agentGrid">
              {agentData.map((a,i) => <button className="agentCard" key={a.name} onClick={() => {setSelectedAgent(a);setAgentOpen(true)}}><div className="agentVisual"><img src={logo} alt="" /><span>0{i+1}</span></div><div className="agentMeta"><span>{a.type}</span><b>{a.name}</b><small>{a.risk} RISK · {a.pnl}</small></div><ArrowRight size={17}/></button>)}
            </div>
            <button className="marketBtn" onClick={() => setAgentOpen(true)}><Sparkles size={17}/> EXPLORE MARKETPLACE</button>
          </div>
        </section>

        <section id="docs" className="section docs">
          <div className="container docsInner">
            <div><span className="kicker">04 / DEVELOPER ACCESS</span><h2>BUILD ON<br/><span>TOXEN.</span></h2><p>Programmatic agents, execution policies and transaction telemetry. The interface is simple enough for humans and structured enough for machines.</p></div>
            <div className="docsActions"><button className="primary" onClick={() => setTerminalOpen(true)}>READ THE DOCS <ArrowRight size={18}/></button><button className="outline" onClick={copyPrompt}>{copied ? <><Check size={17}/> COPIED</> : <><Search size={17}/> COPY AGENT PROMPT</>}</button></div>
          </div>
        </section>
      </main>

      <footer><div className="container footerInner"><div className="brand"><img src={logo} alt=""/><span>TOXEN</span></div><span>BUILT FOR AUTONOMOUS EXECUTION · © 2026</span><a href="https://x.com/toxen_agent" target="_blank" rel="noreferrer">𝕏 @TOXEN_AGENT</a></div></footer>

      {agentOpen && <div className="modalBackdrop" onClick={() => setAgentOpen(false)}><div className="agentModal" onClick={e=>e.stopPropagation()}><button className="modalClose" onClick={()=>setAgentOpen(false)}><X/></button><span className="kicker">AGENT CONFIGURATION</span><img src={logo} className="modalLogo" alt=""/><h2>{selectedAgent.name}</h2><p>{selectedAgent.desc}</p><div className="configRow"><span>RISK PROFILE</span><b>{selectedAgent.risk}</b></div><div className="configRow"><span>DEMO PERFORMANCE</span><b>{selectedAgent.pnl}</b></div><button className="primary full" onClick={()=>{setAgentOpen(false);setWallet(true)}}>DEPLOY AGENT <ArrowRight size={18}/></button></div></div>}

      {terminalOpen && <div className="modalBackdrop" onClick={()=>setTerminalOpen(false)}><div className="terminalModal" onClick={e=>e.stopPropagation()}><div className="termHeader"><span><CircleDot size={12}/> TOXEN TERMINAL</span><button onClick={()=>setTerminalOpen(false)}><X/></button></div><div className="terminalBody">{logs.concat([["04:21:13","AGENT","Execution confirmed","SUCCESS"]]).map((x,i)=><div className="terminalLine" key={i}><span>{x[0]}</span><b>{x[1]}</b><span>{x[2]}</span><em>{x[3]}</em></div>)}</div><div className="terminalInput"><span>toxen@agent:~$</span><span className="blink">_</span></div></div></div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

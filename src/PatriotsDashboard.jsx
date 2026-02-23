import { useState, useMemo, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
import "./PatriotsDashboard.css";

const D = {"m":{"months":["Aug 23","Sep 23","Oct 23","Nov 23","Dec 23","Jan 24","Feb 24","Mar 24","Apr 24","May 24","Jun 24","Jul 24","Aug 24","Sep 24","Oct 24","Nov 24","Dec 24","Jan 25","Feb 25","Mar 25","Apr 25","May 25","Jun 25","Jul 25","Aug 25","Sep 25","Oct 25","Nov 25","Dec 25","Jan 26"],"ig":{"followers":[31502,32083,32364,32472,32609,32642,32680,32585,32508,32402,32543,32536,32938,33644,33998,34988,35494,35681,36105,36505,36593,36542,36440,36457,37016,37846,40248,42269,44674,57993],"engagements":[44000,54000,26000,16000,38000,29000,11000,10000,20000,12000,45000,12000,61000,98000,80000,85000,186000,60800,148600,94030,59700,33000,29000,28471,82680,111210,339470,233720,224792,459737],"impressions":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,748000,2028205,3089012,1144303,2363638,1401142,1065775,737572,739609,575055,1750605,3135602,5486890,5000848,4742575,8731297]},"tt":{"followers":[null,null,null,null,null,null,null,null,8757,8991,9040,9109,9268,9639,10555,10864,11332,12112,16516,17739,19025,19332,20144,20290,20849,21850,25691,27404,29808,43333],"engagements":[null,null,null,null,null,null,null,null,1366,0,211,776,2668,6825,15000,10339,6015,13218,160308,16247,26404,11286,13662,5868,15487,23802,135095,50802,74110,186192],"impressions":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,113147,78578,194316,3147879,138958,346155,130218,186064,72116,199176,265346,1282758,459561,942475,1890955]},"x":{"followers":[47450,47463,48643,48653,48635,48635,48648,48603,48635,48603,48716,48645,48631,48846,48745,48879,48881,48867,48821,48800,48749,48696,48587,48573,48581,48638,48811,48525,48737,49453],"engagements":[7525,24094,6020,3403,8067,5864,2758,1585,4354,2590,13077,1498,8469,27192,11940,9986,23320,13595,10761,5332,7476,3404,2502,4107,11463,10690,23770,22515,20725,50172],"impressions":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,299765,327906,229397,167558,110373,189973,88548,69756,71147,261123,247149,418267,332220,326827,726122]}},"ci":{"months":["Jan 25","Feb 25","Mar 25","Apr 25","May 25","Jun 25","Jul 25","Aug 25","Sep 25","Oct 25","Nov 25","Dec 25","Jan 26"],"accounts":["Patriots Español","San Francisco 49ers en ESPAÑOL","Kansas City Chiefs en Español","Somos Cowboys","Steelers En Español","Los Raiders","Miami Dolphins en Español","Vamos Rams","Broncos En Español","Somos Texans","Cardenales de Arizona"],"followers":{"Patriots Español":[35637,36110,36502,36585,36542,36440,36479,37011,37794,40117,41854,43907,54125],"San Francisco 49ers en ESPAÑOL":[65516,66972,66795,67985,68193,67835,69237,71933,79061,85579,87799,119039,147468],"Kansas City Chiefs en Español":[100022,101354,100023,99114,98615,97643,96957,96872,97604,99319,99692,99366,99141],"Somos Cowboys":[61469,61195,60718,60490,60613,60396,60247,60229,64947,68743,73167,74446,74567],"Steelers En Español":[59786,59729,59847,60065,60308,60447,60726,61215,63147,64724,65937,67576,70160],"Los Raiders":[48869,49236,49615,50305,51020,50952,51361,52208,55405,56333,56762,56819,56928],"Miami Dolphins en Español":[11715,12365,12549,12707,12981,13079,13611,14913,15865,16616,24680,25230,25602],"Vamos Rams":[20726,20831,20740,20756,21092,20986,21052,21045,21935,22945,23482,23870,24505],"Broncos En Español":[14087,14248,14311,14451,14517,14571,14607,14762,15011,16743,18708,21388,23230],"Somos Texans":[16271,16354,16185,16392,16207,15968,15925,15816,16010,16137,17131,19097,21685],"Cardenales de Arizona":[16423,16578,16562,16900,17002,16947,17247,17531,18039,18612,19207,19305,19270]},"engagement":{"Patriots Español":[0.0497,0.146,0.0749,0.0505,0.0181,0.0211,0.02,0.0608,0.0973,0.2624,0.1641,0.1544,0.2593],"Somos Texans":[0.0008,0.0081,0,0.0374,0.0005,0,0.0011,0.002,0.0786,0.012,0.073,0.1674,0.1435],"Broncos En Español":[0.1504,0.0603,0.0448,0.0566,0.0572,0.0381,0.0181,0.0474,0.0757,0.1914,0.1455,0.3039,0.1427],"San Francisco 49ers en ESPAÑOL":[0.0598,0.0509,0.0341,0.082,0.0297,0.022,0.0504,0.0683,0.1985,0.1166,0.0968,0.1511,0.095],"Miami Dolphins en Español":[0.04,0.0499,0.0259,0.0412,0.0149,0.0491,0.0465,0.1567,0.0773,0.0374,0.4335,0.0654,0.0712],"Steelers En Español":[0.0613,0.0187,0.0323,0.056,0.0421,0.0288,0.0268,0.0395,0.0976,0.1237,0.0793,0.0804,0.0654],"Vamos Rams":[0.0506,0.0157,0.0106,0.031,0.02,0.0049,0.0053,0.0115,0.0293,0.0276,0.0643,0.0608,0.0497],"Kansas City Chiefs en Español":[0.1209,0.0649,0.0191,0.0193,0.0239,0.0217,0.0177,0.038,0.0579,0.0758,0.0305,0.0292,0.0259],"Somos Cowboys":[0.0191,0.0059,0.0145,0.0129,0.0202,0.0054,0.0076,0.0147,0.096,0.0888,0.0665,0.0256,0.0244],"Cardenales de Arizona":[0.0449,0.06,0.0034,0.0353,0.0242,0.0101,0.0156,0.0445,0.1526,0.2514,0.3215,0.0388,0.0102],"Los Raiders":[0.062,0.0636,0.0103,0.0445,0.0231,0.0164,0.0043,0.0442,0.1557,0.0279,0.044,0.0384,0.0089]},"rankings":{"Followers Rank":["#6","#6","#6","#6","#6","#6","#6","#6","#6","#6","#6","#6","#6"],"Engagement Rank":["#7","#1","#1","#4","#9","#6","#4","#3","#5","#1","#3","#3","#1"],"Reactions Rank":["#6","#2","#1","#5","#7","#5","#4","#5","#6","#1","#3","#2","#2"],"Follower Growth Rank":["#8","#4","#2","#8","#9","#5","#8","#5","#8","#3","#5","#4","#2"],"Post Interaction Rate Rank":["#9","#3","#2","#9","#9","#5","#6","#2","#8","#3","#4","#2","#3"]}},"ct":{"rankings":{"Followers Rank":["#4","#4","#4","#4","#4","#4","#4","#4","#5","#5","#5","#5","#4"],"Engagement Rank":["#4","#1","#1","#3","#4","#2","#4","#5","#4","#2","#2","#3","#1"],"Reactions Rank":["#4","#1","#2","#4","#5","#4","#4","#5","#5","#4","#2","#3","#2"],"Follower Growth Rank":["#4","#1","#2","#2","#2","#2","#5","#2","#4","#2","#3","#2","#1"]}},"kpi":{"ig_followers_current":69034,"tt_followers_current":67600,"x_followers_current":49718,"ig_season_start":37016,"tt_season_start":20849,"x_season_start":48581,"ig_era_start":32938,"tt_era_start":9268,"x_era_start":48631,"ig_jan_eng":459737,"tt_jan_eng":186192,"x_jan_eng":50172,"sb_tt_eng":502465}};

const fmt=(n)=>{if(n==null)return"—";if(n>=1e6)return(n/1e6).toFixed(1)+"M";if(n>=1e3)return(n/1e3).toFixed(n>=1e5?0:1)+"K";return n.toLocaleString()};
const pct=(n)=>n==null?"—":(n*100).toFixed(1)+"%";
const growth=(c,p)=>p?((c/p-1)*100).toFixed(0):0;
const growthSign=(c,p)=>{const g=growth(c,p);return g>0?`+${g}%`:`${g}%`};

const NAVY="#002244",RED="#C60C30",SILVER="#8A9BAE",GOLD="#D4A017",BG="#0A0F1A",CARD="#111827",CARD2="#1A2332",BORDER="#1E2D3D",TEXT="#E8ECF1",MUTED="#6B7B8D",GREEN="#00E08A";
const platformNames={ig:"Instagram",tt:"TikTok",x:"X (Twitter)"};
const platformIcons={ig:"📸",tt:"🎵",x:"𝕏"};
const lineColors={"Instagram":"#E1306C","TikTok":"#00F2EA","X (Twitter)":"#A8B8C8"};

const Tab=({active,onClick,children})=>(
  <button onClick={onClick} style={{background:active?CARD2:"transparent",color:active?TEXT:MUTED,border:`1px solid ${active?BORDER:"transparent"}`,borderRadius:8,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",transition:"all 0.2s",letterSpacing:0.3}}>{children}</button>
);

const ChartTooltip=({active,payload,label})=>{
  if(!active||!payload?.length)return null;
  return(<div style={{background:"#1A2332",border:`1px solid ${BORDER}`,borderRadius:8,padding:"10px 14px",fontSize:12}}>
    <div style={{color:MUTED,marginBottom:6,fontWeight:600}}>{label}</div>
    {payload.map((p,i)=>p.value!=null&&(<div key={i} style={{color:p.color,display:"flex",gap:8,justifyContent:"space-between",marginBottom:2}}>
      <span>{p.name}</span><span style={{fontWeight:700}}>{typeof p.value==="number"&&p.value<1?pct(p.value):fmt(p.value)}</span>
    </div>))}
  </div>);
};

const RankBadge=({rank})=>{
  const n=parseInt(rank?.replace("#",""))||0;
  const bg=n===1?"#D4A01720":n<=3?"#00E08A15":"transparent";
  const color=n===1?GOLD:n<=3?GREEN:MUTED;
  const border=n===1?`1px solid ${GOLD}40`:n<=3?`1px solid ${GREEN}30`:`1px solid ${BORDER}`;
  return <span style={{display:"inline-block",padding:"2px 8px",borderRadius:4,background:bg,color,border,fontWeight:700,fontSize:12,minWidth:28,textAlign:"center"}}>{rank}</span>;
};

const SectionHeader=({number,title,subtitle})=>(
  <div style={{marginTop:48,marginBottom:20}}>
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
      <span style={{background:RED,color:"#fff",fontSize:11,fontWeight:800,padding:"3px 10px",borderRadius:4,letterSpacing:1}}>{number}</span>
      <h2 style={{fontSize:18,fontWeight:700,color:TEXT,margin:0,letterSpacing:-0.3}}>{title}</h2>
    </div>
    {subtitle&&<p style={{fontSize:12,color:MUTED,margin:"4px 0 0 42px"}}>{subtitle}</p>}
  </div>
);

const StatBox=({value,label,color,small})=>(
  <div style={{textAlign:"center",minWidth:0}}>
    <div style={{fontSize:small?20:28,fontWeight:800,color:color||TEXT,letterSpacing:-1,lineHeight:1}}>{value}</div>
    <div style={{fontSize:9,color:MUTED,marginTop:4,textTransform:"uppercase",letterSpacing:0.8,fontWeight:600,lineHeight:1.2}}>{label}</div>
  </div>
);

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSmall, setIsSmall] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmall(window.innerWidth < 480);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isSmall };
};

function ExecSummary(){
  const K=D.kpi;
  const igRanks=D.ci.rankings["Engagement Rank"];
  const ttRanks=D.ct.rankings["Engagement Rank"];
  const { isMobile, isSmall } = useResponsive();

  const compBar=useMemo(()=>{
    const jan=D.ci.followers;
    return Object.keys(jan).map(name=>({
      name:name.replace(" en ESPAÑOL","").replace(" en Español","").replace(" En Español",""),
      followers:jan[name][12],
      engagement:(D.ci.engagement[name]?.[12]||0),
      isPatriots:name.includes("Patriots"),
    })).sort((a,b)=>b.followers-a.followers);
  },[]);

  const miniFollowerData=useMemo(()=>D.m.months.slice(12).map((m,i)=>({
    m:m.substring(0,3),ig:D.m.ig.followers[12+i],tt:D.m.tt.followers[12+i]
  })),[]);

  const miniEngData=useMemo(()=>D.m.months.slice(24).map((m,i)=>({
    m:m.substring(0,3),ig:D.m.ig.engagements[24+i],tt:D.m.tt.engagements[24+i],x:D.m.x.engagements[24+i]
  })),[]);

  return(<div className="dashboard-container" style={{maxWidth:1200,margin:"0 auto",padding:isSmall?"0 12px 16px":isMobile?"0 16px 24px":"0 40px 48px"}}>
    {/* HEADLINE STORY */}
    <div className="headline-story" style={{margin:"28px 0 24px",background:`linear-gradient(135deg, ${NAVY} 0%, #0A1628 60%, #0F1D2F 100%)`,borderRadius:16,padding:isSmall?"16px 12px 12px":"32px 36px 28px",border:`1px solid ${BORDER}`,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-30,right:-20,fontSize:140,opacity:0.04,lineHeight:1}}>{"🏈"}</div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
        <span style={{background:GOLD,color:"#1A1400",fontSize:10,fontWeight:800,padding:"3px 10px",borderRadius:4,letterSpacing:1.5,textTransform:"uppercase"}}>Headline</span>
      </div>
      <h2 style={{fontSize:isSmall?16:22,fontWeight:800,color:TEXT,margin:"8px 0 6px",lineHeight:1.3,maxWidth:700}}>
        #6 in followers. <span style={{color:GOLD}}>#1 in engagement.</span>
      </h2>
      <p style={{fontSize:isSmall?13:14,color:SILVER,margin:0,lineHeight:1.6,maxWidth:660}}>
        Patriots Espa&ntilde;ol outranks every NFL Espa&ntilde;ol account in engagement &mdash; including 49ers (147K), Chiefs (99K), and Cowboys (75K) &mdash; with just 54K followers. The Vibra Sports strategy delivers outsized results from a smaller audience.
      </p>
    </div>

    {/* KPI ROW */}
    <div className="kpi-grid" style={{display:"grid",gridTemplateColumns:isSmall?"1fr":isMobile?"repeat(2, 1fr)":"repeat(6, 1fr)",gap:isSmall?8:12,marginBottom:20}}>
      {[{v:"69K",l:"IG Followers",c:"#E1306C",s:"+86% season"},{v:"67.6K",l:"TT Followers",c:"#00F2EA",s:"+224% season"},{v:"49.7K",l:"X Followers",c:"#A8B8C8",s:"+2% season"},{v:"186K+",l:"Total Reach",c:TEXT,s:"across all platforms"},{v:"#1",l:"IG Eng. Rank",c:GOLD,s:"of 11 accounts"},{v:"#1",l:"TT Eng. Rank",c:GOLD,s:"of 5 accounts"}].map((k,i)=>(
        <div key={i} className="kpi-item" style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:10,padding:isSmall?"10px 10px":"14px 16px",textAlign:"center"}}>
          <div style={{fontSize:isSmall?18:24,fontWeight:800,color:k.c,letterSpacing:-0.5,lineHeight:1}}>{k.v}</div>
          <div style={{fontSize:isSmall?9:10,color:MUTED,textTransform:"uppercase",letterSpacing:1,fontWeight:600,marginTop:6}}>{k.l}</div>
          <div style={{fontSize:isSmall?9:10,color:GREEN,fontWeight:600,marginTop:2}}>{k.s}</div>
        </div>
      ))}
    </div>

    {/* TWO-COLUMN: Season 2 + Competitors */}
    <div className="two-col-layout" style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:16,marginBottom:16}}>
      {/* LEFT: Season 2 Acceleration */}
      <div className="section-card" style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"20px 24px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
          <span style={{background:RED,color:"#fff",fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:3,letterSpacing:1}}>02</span>
          <span className="section-card-title" style={{fontSize:13,fontWeight:700,color:TEXT}}>Season 2 Acceleration</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"auto 1fr 1fr",fontSize:12}}>
          <div style={{padding:"6px 12px 6px 0"}} /><div style={{padding:"6px 8px",color:MUTED,fontSize:10,fontWeight:600,textAlign:"center",textTransform:"uppercase",letterSpacing:0.8}}>Year 1</div><div style={{padding:"6px 8px",color:TEXT,fontSize:10,fontWeight:600,textAlign:"center",textTransform:"uppercase",letterSpacing:0.8}}>This Season</div>
          {[
            {label:"📸 IG Followers",y1:"+11%",y2:"+86%",hot:true},
            {label:"📸 IG Eng/mo",y1:"−53%",y2:"+456%",hot:true,y1Bad:true},
            {label:"🎵 TT Followers",y1:"+119%",y2:"+224%",hot:true},
            {label:"🎵 TT Eng/mo",y1:"+120%",y2:"+1,102%",hot:true},
            {label:"𝕏 X Followers",y1:"0%",y2:"+2%",hot:false},
            {label:"𝕏 X Eng/mo",y1:"−52%",y2:"+338%",hot:true,y1Bad:true},
          ].map((row,i)=>([
            <div key={`l${i}`} style={{padding:"7px 12px 7px 0",color:TEXT,fontSize:isSmall?10:11,fontWeight:500,borderTop:`1px solid ${BORDER}`}}>{row.label}</div>,
            <div key={`y1${i}`} style={{padding:"7px 8px",textAlign:"center",color:row.y1Bad?"#EF4444":MUTED,fontWeight:600,borderTop:`1px solid ${BORDER}`,fontSize:isSmall?10:12}}>{row.y1}</div>,
            <div key={`y2${i}`} style={{padding:"7px 8px",textAlign:"center",color:row.hot?GREEN:MUTED,fontWeight:700,borderTop:`1px solid ${BORDER}`,fontSize:isSmall?11:13}}>{row.y2}</div>,
          ]))}
        </div>
        <div style={{marginTop:12,padding:"8px 12px",background:`${GREEN}10`,border:`1px solid ${GREEN}20`,borderRadius:8,fontSize:11,color:GREEN,fontWeight:600,lineHeight:1.4}}>
          {"↑"} Every platform's engagement is dramatically up &mdash; content strategy is compounding.
        </div>
      </div>

      {/* RIGHT: Competitive Positioning */}
      <div className="section-card" style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"20px 24px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <span style={{background:RED,color:"#fff",fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:3,letterSpacing:1}}>03</span>
          <span className="section-card-title" style={{fontSize:13,fontWeight:700,color:TEXT}}>Competitive Positioning (Jan '26)</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          {compBar.map((c,i)=>{
            const maxF=compBar[0].followers;const barW=(c.followers/maxF)*100;
            return(<div key={i} style={{display:"grid",gridTemplateColumns:isMobile?"60px 1fr 40px":"110px 1fr 50px",alignItems:"center",gap:8}}>
              <div style={{fontSize:10,color:c.isPatriots?RED:MUTED,fontWeight:c.isPatriots?700:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.isPatriots?"★ ":""}{c.name}</div>
              <div style={{position:"relative",height:16,background:`${BORDER}60`,borderRadius:3,overflow:"hidden"}}>
                <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${barW}%`,background:c.isPatriots?`linear-gradient(90deg, ${RED}, ${RED}CC)`:`${MUTED}40`,borderRadius:3}} />
                <span style={{position:"absolute",left:6,top:1,fontSize:9,color:c.isPatriots?"#fff":MUTED,fontWeight:600,zIndex:1}}>{fmt(c.followers)}</span>
              </div>
              <div style={{fontSize:11,color:c.isPatriots?GREEN:TEXT,fontWeight:c.isPatriots?700:500,textAlign:"right"}}>{pct(c.engagement)}</div>
            </div>);
          })}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:9,color:MUTED,textTransform:"uppercase",letterSpacing:0.8}}>
          <span>{"←"} Followers</span><span>Engagement {"→"}</span>
        </div>
        <div style={{marginTop:10,padding:"8px 12px",background:`${GOLD}10`,border:`1px solid ${GOLD}25`,borderRadius:8,fontSize:11,color:GOLD,fontWeight:600,lineHeight:1.4}}>
          {"★"} Patriots ranks #6 in followers but #1 in engagement &mdash; quality over quantity.
        </div>
      </div>
    </div>

    {/* MINI CHARTS */}
    <div className="mini-charts" style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:16,marginBottom:16}}>
      <div className="mini-chart" style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"16px 20px"}}>
        <div className="mini-chart-title" style={{fontSize:12,fontWeight:700,color:TEXT,marginBottom:2}}>Follower Growth &mdash; Vibra Era</div>
        <div className="mini-chart-subtitle" style={{fontSize:10,color:MUTED,marginBottom:10}}>Aug 2024 {"→"} Jan 2026</div>
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={miniFollowerData} margin={{top:5,right:5,bottom:0,left:-15}}>
            <defs>
              <linearGradient id="gIg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E1306C" stopOpacity={0.3}/><stop offset="100%" stopColor="#E1306C" stopOpacity={0}/></linearGradient>
              <linearGradient id="gTt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00F2EA" stopOpacity={0.3}/><stop offset="100%" stopColor="#00F2EA" stopOpacity={0}/></linearGradient>
            </defs>
            <XAxis dataKey="m" tick={{fontSize:8,fill:MUTED}} interval={2} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:8,fill:MUTED}} tickFormatter={fmt} axisLine={false} tickLine={false}/>
            <Tooltip content={<ChartTooltip/>}/>
            <Area type="monotone" dataKey="ig" stroke="#E1306C" strokeWidth={2} fill="url(#gIg)" dot={false} name="Instagram" connectNulls/>
            <Area type="monotone" dataKey="tt" stroke="#00F2EA" strokeWidth={2} fill="url(#gTt)" dot={false} name="TikTok" connectNulls/>
          </AreaChart>
        </ResponsiveContainer>
        <div style={{display:"flex",gap:16,justifyContent:"center",marginTop:4}}>
          <span style={{fontSize:9,color:"#E1306C",fontWeight:600}}>{"●"} IG: 32.9K {"→"} 69K (+110%)</span>
          <span style={{fontSize:9,color:"#00F2EA",fontWeight:600}}>{"●"} TT: 9.3K {"→"} 67.6K (+629%)</span>
        </div>
      </div>
      <div className="mini-chart" style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"16px 20px"}}>
        <div className="mini-chart-title" style={{fontSize:12,fontWeight:700,color:TEXT,marginBottom:2}}>Monthly Engagements &mdash; This Season</div>
        <div className="mini-chart-subtitle" style={{fontSize:10,color:MUTED,marginBottom:10}}>Aug 2025 {"→"} Jan 2026</div>
        <ResponsiveContainer width="100%" height={isSmall?120:150}>
          <BarChart data={miniEngData} margin={{top:5,right:5,bottom:0,left:-15}}>
            <XAxis dataKey="m" tick={{fontSize:9,fill:MUTED}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:8,fill:MUTED}} tickFormatter={fmt} axisLine={false} tickLine={false}/>
            <Tooltip content={<ChartTooltip/>}/>
            <Bar dataKey="ig" fill="#E1306C" radius={[2,2,0,0]} name="Instagram"/>
            <Bar dataKey="tt" fill="#00F2EA" radius={[2,2,0,0]} name="TikTok"/>
            <Bar dataKey="x" fill="#A8B8C8" radius={[2,2,0,0]} name="X"/>
          </BarChart>
        </ResponsiveContainer>
        <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:4,fontSize:9,color:MUTED}}>
          <span><span style={{color:"#E1306C"}}>{"●"}</span> IG: 1.45M</span>
          <span><span style={{color:"#00F2EA"}}>{"●"}</span> TT: 485K</span>
          <span><span style={{color:"#A8B8C8"}}>{"●"}</span> X: 139K</span>
        </div>
      </div>
    </div>

    {/* RANKINGS + SUPER BOWL */}
    <div className="rankings-superbowl" style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"2fr 1fr",gap:16,marginBottom:20}}>
      <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"16px 20px"}}>
        <div style={{fontSize:12,fontWeight:700,color:TEXT,marginBottom:12}}>Engagement Rank Progression (Jan '25 {"→"} Jan '26)</div>
        {[{label:"📸 IG (of 11)",ranks:igRanks},{label:"🎵 TT (of 5)",ranks:ttRanks}].map((row,ri)=>(
          <div key={ri} style={{display:"flex",alignItems:"center",gap:8,marginBottom:ri===0?8:0,flexWrap:isMobile?"wrap":"nowrap"}}>
            <span style={{fontSize:10,color:MUTED,fontWeight:600,minWidth:70}}>{row.label}</span>
            <div style={{display:"flex",gap:4,flex:1,flexWrap:"wrap"}}>{row.ranks.map((r,i)=><RankBadge key={i} rank={r}/>)}</div>
          </div>
        ))}
        <div style={{marginTop:10,fontSize:10,color:MUTED}}>
          <span style={{color:GOLD}}>{"■"}</span> #1 <span style={{color:GREEN}}>{"■"}</span> Top 3 &mdash; Top 3 in IG engagement <strong style={{color:TEXT}}>5 of last 6 months</strong>. Hit #1 three times.
        </div>
      </div>
      <div style={{background:`linear-gradient(135deg, #1A0A0F 0%, ${CARD} 100%)`,border:`1px solid ${RED}30`,borderRadius:12,padding:"16px 20px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div style={{fontSize:11,color:RED,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,marginBottom:10}}>{"🏈"} Super Bowl Week</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:10}}>
          <StatBox value="502K" label="TT Engagements" color="#00F2EA" small/>
          <StatBox value="262K" label="IG Engagements" color="#E1306C" small/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <StatBox value="+69%" label="TT Follower Spike" color={GREEN} small/>
          <StatBox value={"40K→68K"} label="TT in One Week" color={GREEN} small/>
        </div>
      </div>
    </div>

    {/* EXECUTIVE TAKEAWAYS */}
    <div className="executive-takeaways" style={{background:`linear-gradient(135deg, #1A1400 0%, #0F1D2F 100%)`,border:`1px solid ${GOLD}30`,borderRadius:12,padding:isSmall?"16px 16px":"20px 24px"}}>
      <div style={{fontSize:13,fontWeight:800,color:GOLD,marginBottom:14,display:"flex",alignItems:"center",gap:8,gridColumn:"1 / -1"}}>
        <span>{"🎖"}</span> EXECUTIVE TAKEAWAYS
      </div>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isSmall?"12px 16px":"10px 24px"}}>
        {[
          {n:1,text:"Patriots Español is the #1 engaged NFL Español brand — outperforming accounts with 2–3× more followers. Quality over quantity."},
          {n:2,text:"Season 2 is a breakout: IG +86%, TT +224%, engagement 3× Year 1. The content strategy is compounding."},
          {n:3,text:"Super Bowl proved scalability: 500K+ TT engagements, 260K+ IG, 69% TT follower growth in one week."},
          {n:4,text:"TikTok nearly caught IG in followers (67.6K vs 69K). TT investment has the highest ROI for growth."},
        ].map((t,i)=>(
          <div key={i} className="takeaway-item" style={{display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{color:RED,fontWeight:800,fontSize:15,minWidth:16}}>{t.n}</span>
            <span style={{fontSize:isSmall?11:12,color:"#D4C9A8",lineHeight:1.55}}>{t.text}</span>
          </div>
        ))}}
      </div>
    </div>
  </div>);
}

const C = {"months":["Jan'25","Feb'25","Mar'25","Apr'25","May'25","Jun'25","Jul'25","Aug'25","Sep'25","Oct'25","Nov'25","Dec'25","Jan'26"],"ig":{"accounts":["Patriots Español","San Francisco 49ers en ESPAÑOL","Kansas City Chiefs en Español","Somos Cowboys","Steelers En Español","Los Raiders","Miami Dolphins en Español","Vamos Rams","Broncos En Español","Somos Texans","Cardenales de Arizona"],"followers":{"Patriots Español":[35637,36110,36502,36585,36542,36440,36479,37011,37794,40117,41854,43907,54125],"San Francisco 49ers en ESPAÑOL":[65516,66972,66795,67985,68193,67835,69237,71933,79061,85579,87799,119039,147468],"Kansas City Chiefs en Español":[100022,101354,100023,99114,98615,97643,96957,96872,97604,99319,99692,99366,99141],"Somos Cowboys":[61469,61195,60718,60490,60613,60396,60247,60229,64947,68743,73167,74446,74567],"Steelers En Español":[59786,59729,59847,60065,60308,60447,60726,61215,63147,64724,65937,67576,70160],"Los Raiders":[48869,49236,49615,50305,51020,50952,51361,52208,55405,56333,56762,56819,56928],"Miami Dolphins en Español":[11715,12365,12549,12707,12981,13079,13611,14913,15865,16616,24680,25230,25602],"Vamos Rams":[20726,20831,20740,20756,21092,20986,21052,21045,21935,22945,23482,23870,24505],"Broncos En Español":[14087,14248,14311,14451,14517,14571,14607,14762,15011,16743,18708,21388,23230],"Somos Texans":[16271,16354,16185,16392,16207,15968,15925,15816,16010,16137,17131,19097,21685],"Cardenales de Arizona":[16423,16578,16562,16900,17002,16947,17247,17531,18039,18612,19207,19305,19270]},"engagement":{"Patriots Español":[0.0497,0.146,0.0749,0.0505,0.0181,0.0211,0.02,0.0608,0.0973,0.2624,0.1641,0.1544,0.2593],"Somos Texans":[0.0008,0.0081,0,0.0374,0.0005,0,0.0011,0.002,0.0786,0.012,0.073,0.1674,0.1435],"Broncos En Español":[0.1504,0.0603,0.0448,0.0566,0.0572,0.0381,0.0181,0.0474,0.0757,0.1914,0.1455,0.3039,0.1427],"San Francisco 49ers en ESPAÑOL":[0.0598,0.0509,0.0341,0.082,0.0297,0.022,0.0504,0.0683,0.1985,0.1166,0.0968,0.1511,0.095],"Miami Dolphins en Español":[0.04,0.0499,0.0259,0.0412,0.0149,0.0491,0.0465,0.1567,0.0773,0.0374,0.4335,0.0654,0.0712],"Steelers En Español":[0.0613,0.0187,0.0323,0.056,0.0421,0.0288,0.0268,0.0395,0.0976,0.1237,0.0793,0.0804,0.0654],"Vamos Rams":[0.0506,0.0157,0.0106,0.031,0.02,0.0049,0.0053,0.0115,0.0293,0.0276,0.0643,0.0608,0.0497],"Kansas City Chiefs en Español":[0.1209,0.0649,0.0191,0.0193,0.0239,0.0217,0.0177,0.038,0.0579,0.0758,0.0305,0.0292,0.0259],"Somos Cowboys":[0.0191,0.0059,0.0145,0.0129,0.0202,0.0054,0.0076,0.0147,0.096,0.0888,0.0665,0.0256,0.0244],"Cardenales de Arizona":[0.0449,0.06,0.0034,0.0353,0.0242,0.0101,0.0156,0.0445,0.1526,0.2514,0.3215,0.0388,0.0102],"Los Raiders":[0.062,0.0636,0.0103,0.0445,0.0231,0.0164,0.0043,0.0442,0.1557,0.0279,0.044,0.0384,0.0089]},"reactions":{"Patriots Español":[54807,146695,84302,55308,20528,23046,22597,69094,109241,315384,200937,204471,382769],"San Francisco 49ers en ESPAÑOL":[119042,94726,70639,165599,62725,44776,107125,148593,448552,300408,251986,515671,403287],"Steelers En Español":[113413,31279,59835,100492,78590,52126,50304,74726,182155,245003,155625,166306,139725],"Broncos En Español":[64826,23879,19838,24385,25676,16635,8195,21624,33806,93761,76909,184573,98168],"Somos Texans":[403,3691,0,18188,238,0,534,977,37601,5978,36390,94142,90214],"Kansas City Chiefs en Español":[363574,183759,59541,57669,73239,64008,53275,113843,169119,230903,91017,90066,79727],"Somos Cowboys":[36486,10185,27391,23352,37963,9889,14233,27523,183336,185714,139900,58876,56431],"Miami Dolphins en Español":[11938,16513,10021,15566,5959,19184,19201,68412,36012,19007,264829,50603,56182],"Vamos Rams":[31870,9113,6833,19299,13001,3106,3443,7539,18852,19314,44632,44565,37303],"Los Raiders":[92746,87410,15795,66885,36259,25080,6858,70781,253249,48227,74617,67538,15792],"Cardenales de Arizona":[22813,27745,1773,17672,12734,5135,8281,24026,82029,143602,183075,23159,6121]},"foll_growth":{"Patriots Español":[0.0052,0.0133,0.0109,0.0023,-0.0012,-0.0028,0.0011,0.0146,0.0212,0.0615,0.0433,0.0491,0.2327],"San Francisco 49ers en ESPAÑOL":[0.0333,0.0222,-0.0026,0.0178,0.0031,-0.0052,0.0207,0.0389,0.0991,0.0824,0.0259,0.3558,0.2388],"Somos Texans":[0.011,0.0051,-0.0103,0.0128,-0.0113,-0.0147,-0.0027,-0.0068,0.0123,0.0079,0.0616,0.1148,0.1355],"Broncos En Español":[0.0304,0.0114,0.0044,0.0098,0.0046,0.0037,0.0025,0.0106,0.0169,0.1154,0.1174,0.1433,0.0861],"Steelers En Español":[0.003,-0.001,0.002,0.0036,0.004,0.0023,0.0046,0.0081,0.0316,0.025,0.0187,0.0249,0.0382],"Vamos Rams":[0.0354,0.0051,-0.0044,0.0008,0.0162,-0.005,0.0031,-0.0003,0.0423,0.046,0.0234,0.0165,0.0266],"Miami Dolphins en Español":[0.7828,0.0555,0.0149,0.0126,0.0216,0.0075,0.0407,0.0957,0.0638,0.0473,0.4853,0.0223,0.0147],"Los Raiders":[0.0244,0.0075,0.0077,0.0139,0.0142,-0.0013,0.008,0.0165,0.0612,0.0167,0.0076,0.001,0.0019],"Somos Cowboys":[-0.0039,-0.0045,-0.0078,-0.0038,0.002,-0.0036,-0.0025,-0.0003,0.0783,0.0584,0.0644,0.0175,0.0016],"Cardenales de Arizona":[0.0032,0.0094,-0.001,0.0204,0.006,-0.0032,0.0177,0.0165,0.029,0.0318,0.032,0.0051,-0.0018],"Kansas City Chiefs en Español":[0.0516,0.0133,-0.0131,-0.0091,-0.005,-0.0099,-0.007,-0.0009,0.0076,0.0176,0.0038,-0.0033,-0.0023]},"interaction_rate":{"Patriots Español":[0.0253,0.1239,0.0683,0.0194,0.017,0.0218,0.0207,0.033,0.0298,0.0656,0.0474,0.0515,0.0731],"Miami Dolphins en Español":[0.155,0.6992,0.1607,0.0617,0.0513,0.3679,0.0555,0.113,0.0455,0.0387,0.1781,0.0431,0.1379],"Broncos En Español":[0.0992,0.0675,0.0496,0.0447,0.0633,0.0423,0.0234,0.0272,0.0355,0.0723,0.074,0.1135,0.0776],"Somos Texans":[0.0083,0.0752,0,0.1247,0.0073,0,0.0333,0.0154,0.2143,0.0372,0.0365,0.0324,0.0377],"Somos Cowboys":[0.0219,0.0138,0.015,0.0104,0.0232,0.0136,0.0118,0.0138,0.0613,0.0492,0.0424,0.0256,0.0316],"Vamos Rams":[0.0523,0.0292,0.0235,0.0517,0.0443,0.0164,0.0126,0.0156,0.02,0.0251,0.0292,0.0369,0.0261],"Steelers En Español":[0.0284,0.0209,0.0286,0.0323,0.0266,0.0278,0.0237,0.0159,0.0261,0.0404,0.0178,0.0211,0.0247],"Kansas City Chiefs en Español":[0.0305,0.0275,0.0156,0.01,0.0165,0.0145,0.0124,0.0108,0.0117,0.0147,0.0082,0.0095,0.0201],"San Francisco 49ers en ESPAÑOL":[0.0272,0.0356,0.032,0.0502,0.0341,0.0314,0.0274,0.0208,0.0352,0.0208,0.0138,0.024,0.02],"Cardenales de Arizona":[0.0268,0.08,0.0059,0.0225,0.0313,0.0189,0.0179,0.0206,0.0428,0.0987,0.0885,0.0154,0.0118],"Los Raiders":[0.0739,0.1371,0.0168,0.0257,0.0204,0.0189,0.0067,0.0298,0.0708,0.0216,0.0188,0.0192,0.0103]},"posts_day":{"Patriots Español":[1.9677,1.1786,1.0968,2.6,1.0645,0.9667,0.9677,1.8387,3.2667,4,3.4667,3,3.5484],"San Francisco 49ers en ESPAÑOL":[2.1935,1.4286,1.0645,1.6333,0.871,0.7,1.8387,3.2903,5.6333,5.6129,7,6.2903,4.7419],"Somos Texans":[0.0968,0.1071,0,0.3,0.0645,0,0.0323,0.129,0.3667,0.3226,2,5.1613,3.8065],"Steelers En Español":[2.1613,0.8929,1.129,1.7333,1.5806,1.0333,1.129,2.4839,3.7333,3.0645,4.4667,3.8065,2.6452],"Vamos Rams":[0.9677,0.5357,0.4516,0.6,0.4516,0.3,0.4194,0.7419,1.4667,1.0968,2.2,1.6452,1.9032],"Broncos En Español":[1.5161,0.8929,0.9032,1.2667,0.9032,0.9,0.7742,1.7419,2.1333,2.6452,1.9667,2.6774,1.8387],"Kansas City Chiefs en Español":[3.9677,2.3571,1.2258,1.9333,1.4516,1.5,1.4194,3.5161,4.9333,5.1613,3.7,3.0645,1.2903],"Cardenales de Arizona":[1.6774,0.75,0.5806,1.5667,0.7742,0.5333,0.871,2.1613,3.5667,2.5484,3.6333,2.5161,0.871],"Los Raiders":[0.8387,0.4643,0.6129,1.7333,1.129,0.8667,0.6452,1.4839,2.2,1.2903,2.3333,2,0.871],"Somos Cowboys":[0.871,0.4286,0.9677,1.2333,0.871,0.4,0.6452,1.0645,1.5667,1.8065,1.5667,1,0.7742],"Miami Dolphins en Español":[0.2581,0.0714,0.1613,0.6667,0.2903,0.1333,0.8387,1.3871,1.7,0.9677,2.4333,1.5161,0.5161]},"rankings":{"Followers Rank":["#6","#6","#6","#6","#6","#6","#6","#6","#6","#6","#6","#6","#6"],"Engagement Rank":["#7","#1","#1","#4","#9","#6","#4","#3","#5","#1","#3","#3","#1"],"Reactions Rank":["#6","#2","#1","#5","#7","#5","#4","#5","#6","#1","#3","#2","#2"],"Follower Growth Rank":["#8","#4","#2","#8","#9","#5","#8","#5","#8","#3","#5","#4","#2"],"Post Interaction Rate Rank":["#9","#3","#2","#9","#9","#5","#6","#2","#8","#3","#4","#2","#3"]}},"tt":{"accounts":["Patriots Español","49ers en Español","Steelers En Español","Kansas City Chiefs en Español","SomosCowboys"],"followers":{"Patriots Español":[12000,16800,17700,18800,19300,20100,20300,20800,21800,25500,27100,29300,39400],"49ers en Español":[127800,148100,150700,155700,158900,159400,161900,164900,179700,200600,223400,245600,272900],"Steelers En Español":[58900,60600,61200,64800,65500,66100,67200,68100,74300,78000,78500,81900,87500],"Kansas City Chiefs en Español":[45611,48725,48609,48591,49582,51165,51713,52969,55081,58373,58831,58940,59412],"SomosCowboys":[8746,8828,9660,11800,14600,15800,16500,17600,23300,31100,33100,33800,33900]},"engagement":{"Patriots Español":[0.0196,0.3758,0.0389,0.024,0.0122,0.0186,0.0076,0.0228,0.0441,0.1791,0.0577,0.0842,0.1827],"49ers en Español":[0.0806,0.0238,0.0122,0.0181,0.0239,0.0029,0.0237,0.0287,0.0877,0.0524,0.164,0.1116,0.0845],"Steelers En Español":[0.1457,0.0137,0.005,0.1267,0.0114,0.0091,0.0311,0.0425,0.1143,0.4018,0.0155,0.0879,0.0344],"Kansas City Chiefs en Español":[0.0564,0.0113,0.0017,0.0041,0.0167,0.0041,0.0029,0.029,0.0231,0.0293,0.0057,0.008,0.0032],"SomosCowboys":[0.0098,0.0049,0.0359,0.0986,0.1255,0.0508,0.0348,0.0359,0.3016,0.174,0.0299,0.0117,0.0024]},"reactions":{"Patriots Español":[7051,151606,20428,13046,7218,10943,4776,14504,28056,127613,45499,72954,184927],"49ers en Español":[291037,92608,56534,82625,116880,13661,117739,145593,451331,312115,1036050,812616,675368],"Steelers En Español":[240796,22818,9361,239772,23091,17971,64126,89058,243771,954111,36490,216421,89739],"Kansas City Chiefs en Español":[72822,14717,2549,5980,25508,6322,4610,46791,37402,51519,10055,14646,5919],"SomosCowboys":[2607,1209,10342,31645,51332,23012,17456,19171,177314,155521,28353,12078,2532]},"foll_growth":{"Patriots Español":[0.0714,0.4,0.0536,0.0621,0.0266,0.0415,0.01,0.0246,0.0481,0.1697,0.0627,0.0812,0.3447],"49ers en Español":[0.1768,0.1588,0.0176,0.0332,0.0206,0.0031,0.0157,0.0185,0.0898,0.1163,0.1137,0.0994,0.1112],"Steelers En Español":[0.1996,0.0289,0.0099,0.0588,0.0108,0.0092,0.0166,0.0134,0.091,0.0498,0.0064,0.0433,0.0684],"Kansas City Chiefs en Español":[0.1837,0.0683,-0.0024,-0.0004,0.0204,0.0319,0.0107,0.0243,0.0399,0.0598,0.0078,0.0019,0.008],"SomosCowboys":[0.0311,0.0094,0.0942,0.2215,0.2373,0.0822,0.0443,0.0667,0.3239,0.3348,0.0643,0.0211,0.003]},"rankings":{"Followers Rank":["#4","#4","#4","#4","#4","#4","#4","#4","#5","#5","#5","#5","#4"],"Engagement Rank":["#4","#1","#1","#3","#4","#2","#4","#5","#4","#2","#2","#3","#1"],"Reactions Rank":["#4","#1","#2","#4","#5","#4","#4","#5","#5","#4","#2","#3","#2"],"Follower Growth Rank":["#4","#1","#2","#2","#2","#2","#5","#2","#4","#2","#3","#2","#1"]}}};

function CompBenchmark() {
  const [plat, setPlat] = useState("ig");
  const [metric, setMetric] = useState("engagement");
  const [sortCol, setSortCol] = useState("latest");
  const [sortDir, setSortDir] = useState("desc");
  const { isMobile, isSmall } = useResponsive();

  const platData = plat === "ig" ? C.ig : C.tt;
  const accounts = platData.accounts;
  const metrics = plat === "ig"
    ? {engagement:"Engagement",followers:"Followers",reactions:"Total Reactions",foll_growth:"Follower Growth %",interaction_rate:"Post Interaction Rate",posts_day:"Posts / Day"}
    : {engagement:"Engagement",followers:"Followers",reactions:"Total Reactions",foll_growth:"Follower Growth %"};

  const metricData = platData[metric] || {};
  const isPercent = ["engagement","foll_growth","interaction_rate"].includes(metric);

  const tableData = useMemo(() => {
    return accounts.map(name => {
      const vals = metricData[name] || Array(13).fill(null);
      const shortName = name.replace(" en ESPAÑOL","").replace(" en Español","").replace(" En Español","");
      const isP = name.includes("Patriots");
      const latest = vals[12];
      const first = vals[0];
      const change = (latest != null && first != null && first !== 0) ? (latest - first) / Math.abs(first) : null;
      const avg = vals.filter(v => v != null && v !== 0).reduce((a,b) => a+b, 0) / (vals.filter(v => v != null && v !== 0).length || 1);
      return { name, shortName, isP, vals, latest, first, change, avg };
    });
  }, [plat, metric]);

  const sorted = useMemo(() => {
    const key = sortCol === "latest" ? "latest" : sortCol === "change" ? "change" : sortCol === "avg" ? "avg" : "shortName";
    return [...tableData].sort((a, b) => {
      let va = a[key], vb = b[key];
      if (typeof va === "string") return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      va = va ?? -Infinity; vb = vb ?? -Infinity;
      return sortDir === "asc" ? va - vb : vb - va;
    });
  }, [tableData, sortCol, sortDir]);

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("desc"); }
  };

  const SortBtn = ({col, children}) => (
    <button onClick={() => toggleSort(col)} style={{background:"none",border:"none",color:sortCol===col?TEXT:MUTED,cursor:"pointer",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,padding:"6px 4px",display:"flex",alignItems:"center",gap:3}}>
      {children}
      <span style={{fontSize:8,opacity:sortCol===col?1:0.3}}>{sortCol===col?(sortDir==="desc"?"▼":"▲"):"▼"}</span>
    </button>
  );

  const trendData = useMemo(() => {
    return C.months.map((m, i) => {
      const row = { month: m };
      accounts.forEach(name => {
        const short = name.replace(" en ESPAÑOL","").replace(" en Español","").replace(" En Español","");
        row[short] = (metricData[name] || [])[i];
      });
      return row;
    });
  }, [plat, metric]);

  const allRankTypes = plat === "ig"
    ? ["Engagement Rank","Followers Rank","Reactions Rank","Follower Growth Rank","Post Interaction Rate Rank"]
    : ["Engagement Rank","Followers Rank","Reactions Rank","Follower Growth Rank"];
  const rankData = platData.rankings;

  const fmtVal = (v) => {
    if (v == null) return "—";
    if (isPercent) return (v * 100).toFixed(1) + "%";
    if (v >= 1e6) return (v/1e6).toFixed(1) + "M";
    if (v >= 1e3) return (v/1e3).toFixed(v >= 1e5 ? 0 : 1) + "K";
    if (typeof v === "number" && v < 10) return v.toFixed(2);
    return typeof v === "number" ? v.toLocaleString() : String(v);
  };

  return (
    <div className="dashboard-container" style={{maxWidth:1200,margin:"0 auto",padding:isSmall?"0 12px 30px":isMobile?"0 16px 40px":"0 40px 60px"}}>
      <div style={{margin:"28px 0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div>
          <h2 style={{fontSize:20,fontWeight:800,color:TEXT,margin:0}}>Competitive Benchmarking</h2>
          <p style={{fontSize:12,color:MUTED,margin:"4px 0 0"}}>
            {plat==="ig"?"11 NFL Español Instagram accounts":"5 NFL Español TikTok accounts"} — Jan 2025 → Jan 2026
          </p>
        </div>
        <div style={{display:"flex",gap:6}}>
          <Tab active={plat==="ig"} onClick={()=>{setPlat("ig");setMetric("engagement")}}>📸 Instagram (11)</Tab>
          <Tab active={plat==="tt"} onClick={()=>{setPlat("tt");setMetric("engagement")}}>🎵 TikTok (5)</Tab>
        </div>
      </div>

      <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"20px 24px",marginBottom:20}}>
        <div style={{fontSize:13,fontWeight:700,color:TEXT,marginBottom:16}}>Patriots Rank Progression ({plat==="ig"?"of 11":"of 5"})</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {allRankTypes.map((rankType, ri) => {
            const ranks = rankData[rankType] || [];
            return (
              <div key={ri} style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:10,color:MUTED,fontWeight:600,minWidth:140,whiteSpace:"nowrap"}}>{rankType.replace(" Rank","")}</span>
                <div style={{display:"flex",gap:4,flex:1}}>
                  {ranks.map((r, i) => (
                    <div key={i} style={{textAlign:"center",flex:1}}>
                      {ri === 0 && <div style={{fontSize:8,color:MUTED,marginBottom:3}}>{C.months[i]}</div>}
                      <RankBadge rank={r} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{marginTop:12,fontSize:10,color:MUTED}}>
          <span style={{color:GOLD}}>■</span> #1 <span style={{color:GREEN}}>■</span> Top 3 — Trending upward across all ranking categories since season start (Aug '25).
        </div>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:16,flexWrap:"wrap"}}>
        {Object.entries(metrics).map(([k, v]) => (
          <Tab key={k} active={metric===k} onClick={()=>setMetric(k)}>{v}</Tab>
        ))}
      </div>

      <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"20px",marginBottom:20}}>
        <div style={{fontSize:13,fontWeight:700,color:TEXT,marginBottom:4}}>{metrics[metric]} Over Time</div>
        <div style={{fontSize:10,color:MUTED,marginBottom:12}}>Patriots highlighted in red. Click table headers below to sort.</div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke={BORDER}/>
            <XAxis dataKey="month" tick={{fontSize:9,fill:MUTED}}/>
            <YAxis tick={{fontSize:9,fill:MUTED}} tickFormatter={isPercent?(v)=>(v*100).toFixed(0)+"%":fmt} width={50}/>
            <Tooltip content={<ChartTooltip/>}/>
            {accounts.map((name, i) => {
              const short = name.replace(" en ESPAÑOL","").replace(" en Español","").replace(" En Español","");
              const isP = name.includes("Patriots");
              return <Line key={name} type="monotone" dataKey={short} stroke={isP?RED:`hsl(${i*32},40%,55%)`} strokeWidth={isP?3:1.2} dot={false} strokeOpacity={isP?1:0.4} connectNulls/>;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,overflow:"hidden"}}>
        <div style={{padding:"16px 20px 0"}}>
          <div style={{fontSize:13,fontWeight:700,color:TEXT,marginBottom:4}}>{metrics[metric]} — Full Comparison Table</div>
          <div style={{fontSize:10,color:MUTED,marginBottom:12}}>Click column headers to sort. Green = positive change, red = negative.</div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead>
              <tr style={{borderBottom:`1px solid ${BORDER}`}}>
                <th style={{textAlign:"left",padding:"8px 16px",position:"sticky",left:0,background:CARD,zIndex:1}}><SortBtn col="name">Account</SortBtn></th>
                <th style={{textAlign:"right",padding:"8px 12px"}}><SortBtn col="latest">Jan '26</SortBtn></th>
                <th style={{textAlign:"right",padding:"8px 12px"}}><SortBtn col="change">13-Mo Δ</SortBtn></th>
                <th style={{textAlign:"right",padding:"8px 12px"}}><SortBtn col="avg">Average</SortBtn></th>
                {C.months.map((m, i) => (
                  <th key={i} style={{textAlign:"right",padding:"8px 8px",minWidth:60}}>
                    <span style={{fontSize:9,color:MUTED,fontWeight:600}}>{m}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, ri) => (
                <tr key={ri} style={{borderBottom:`1px solid ${BORDER}`,background:row.isP?`${RED}10`:ri%2===0?"transparent":`${CARD2}30`}}>
                  <td style={{padding:"8px 16px",fontWeight:row.isP?700:400,color:row.isP?RED:TEXT,whiteSpace:"nowrap",position:"sticky",left:0,background:CARD,zIndex:1}}>
                    {row.isP?"★ ":""}{row.shortName}
                  </td>
                  <td style={{textAlign:"right",padding:"8px 12px",fontWeight:700,color:row.isP?GREEN:TEXT}}>{fmtVal(row.latest)}</td>
                  <td style={{textAlign:"right",padding:"8px 12px",color:row.change>0?GREEN:row.change<0?"#EF4444":MUTED,fontWeight:600}}>
                    {row.change!=null?(row.change>0?"+":"")+(row.change*100).toFixed(0)+"%":"—"}
                  </td>
                  <td style={{textAlign:"right",padding:"8px 12px",color:MUTED}}>{fmtVal(row.avg)}</td>
                  {row.vals.map((v, vi) => {
                    const isMax = v != null && tableData.every(r => (r.vals[vi]??-Infinity) <= v);
                    return (
                      <td key={vi} style={{textAlign:"right",padding:"8px 8px",color:row.isP?(isMax?GOLD:TEXT):MUTED,fontWeight:isMax&&row.isP?700:400,fontSize:11}}>
                        {fmtVal(v)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{marginTop:24,background:`linear-gradient(135deg, #1A1400 0%, #0F1D2F 100%)`,border:`1px solid ${GOLD}30`,borderRadius:12,padding:"20px 24px"}}>
        <div style={{fontSize:13,fontWeight:800,color:GOLD,marginBottom:12}}>🏆 Competitive Story</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 24px"}}>
          {[
            {n:1,text:"Patriots Español is the #1 engaged NFL Español brand on both IG and TT in Jan '26 — despite ranking only #6 in IG followers."},
            {n:2,text:"IG engagement rank improved from #7 (Jan '25) to #1 (Jan '26). Consistent upward movement since Aug '25 season start."},
            {n:3,text:"Follower growth rank climbed from #8 to #2 on IG, and #4 to #1 on TT. Growth is accelerating faster than any competitor."},
            {n:4,text:"Key rivals: 49ers have 2.7× more IG followers but only 0.37× Patriots' engagement. Chiefs have 1.8× followers but 0.10× engagement."},
          ].map((t,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
              <span style={{color:RED,fontWeight:800,fontSize:15,minWidth:16}}>{t.n}</span>
              <span style={{fontSize:12,color:"#D4C9A8",lineHeight:1.55}}>{t.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FullAnalytics(){
  const[timeRange,setTimeRange]=useState("season");
  const[platform,setPlatform]=useState("all");
  const[compMetric,setCompMetric]=useState("engagement");
  const[chartView,setChartView]=useState("followers");
  const { isMobile, isSmall } = useResponsive();
  const K=D.kpi;
  const timeRanges={season:{label:"This Season",start:24,desc:"Aug 2025 → Jan 2026"},vibra:{label:"Vibra Era",start:12,desc:"Aug 2024 → Jan 2026"},all:{label:"All Time",start:0,desc:"Aug 2023 → Jan 2026"}};
  const range=timeRanges[timeRange];
  const months=D.m.months.slice(range.start);
  const sl=(arr)=>(arr||[]).slice(range.start);

  const followerData=useMemo(()=>months.map((m,i)=>({month:m,Instagram:sl(D.m.ig.followers)[i],TikTok:sl(D.m.tt.followers)[i],"X (Twitter)":sl(D.m.x.followers)[i]})),[timeRange]);
  const engData=useMemo(()=>months.map((m,i)=>({month:m,Instagram:sl(D.m.ig.engagements)[i],TikTok:sl(D.m.tt.engagements)[i],"X (Twitter)":sl(D.m.x.engagements)[i]})),[timeRange]);
  const impData=useMemo(()=>months.map((m,i)=>({month:m,Instagram:sl(D.m.ig.impressions)[i],TikTok:sl(D.m.tt.impressions)[i],"X (Twitter)":sl(D.m.x.impressions)[i]})),[timeRange]);
  const chartDataMap={followers:followerData,engagements:engData,impressions:impData};

  const compEngData=useMemo(()=>D.ci.months.map((m,i)=>{
    const row={month:m.replace(" 25","'25").replace(" 26","'26")};
    const src=compMetric==="engagement"?D.ci.engagement:D.ci.followers;
    Object.entries(src).forEach(([name,vals])=>{row[name]=vals[i]});
    return row;
  }),[compMetric]);

  const igRanks=D.ci.rankings["Engagement Rank"];
  const ttRanks=D.ct.rankings["Engagement Rank"];
  const platformsToShow=platform==="all"?["Instagram","TikTok","X (Twitter)"]:[platformNames[platform]];

  const seasonComparison=[
    {platform:"Instagram",metric:"Followers",y1Start:"32,938",y1End:"36,457",y1Growth:"+11%",y2Start:"37,016",y2Current:"69,034",y2Growth:"+86%",hot:true},
    {platform:"Instagram",metric:"Eng./mo",y1Start:"61K",y1End:"28K",y1Growth:"−53%",y2Start:"83K",y2Current:"460K",y2Growth:"+456%",hot:true,y1Bad:true},
    {platform:"TikTok",metric:"Followers",y1Start:"9,268",y1End:"20,290",y1Growth:"+119%",y2Start:"20,849",y2Current:"67,600",y2Growth:"+224%",hot:true},
    {platform:"TikTok",metric:"Eng./mo",y1Start:"2.7K",y1End:"5.9K",y1Growth:"+120%",y2Start:"15K",y2Current:"186K",y2Growth:"+1,102%",hot:true},
    {platform:"X (Twitter)",metric:"Followers",y1Start:"48,631",y1End:"48,573",y1Growth:"0%",y2Start:"48,581",y2Current:"49,718",y2Growth:"+2%",hot:false},
    {platform:"X (Twitter)",metric:"Eng./mo",y1Start:"8.5K",y1End:"4.1K",y1Growth:"−52%",y2Start:"11K",y2Current:"50K",y2Growth:"+338%",hot:true,y1Bad:true},
  ];

  const topCompetitors=useMemo(()=>
    Object.entries(D.ci.engagement).map(([name,vals])=>({
      name:name.replace(" en ESPAÑOL","").replace(" en Español","").replace(" En Español",""),
      engagement:vals[12],followers:D.ci.followers[name]?.[12]||0,
    })).sort((a,b)=>(b.engagement||0)-(a.engagement||0)),[]);

  return(<div className="dashboard-container" style={{maxWidth:1200,margin:"0 auto",padding:isSmall?"0 12px 30px":isMobile?"0 16px 40px":"0 40px 60px"}}>
    {/* KPIs */}
    <div style={{marginTop:28,display:"grid",gridTemplateColumns:isSmall?"repeat(auto-fit, minmax(150px, 1fr))":"repeat(auto-fit, minmax(200px, 1fr))",gap:14}}>
      {[
        {icon:"📸",label:"IG Followers",value:fmt(K.ig_followers_current),sub:`${growthSign(K.ig_followers_current,K.ig_season_start)} this season`,accent:"#E1306C"},
        {icon:"🎵",label:"TT Followers",value:fmt(K.tt_followers_current),sub:`${growthSign(K.tt_followers_current,K.tt_season_start)} this season`,accent:"#00F2EA"},
        {icon:"𝕏",label:"X Followers",value:fmt(K.x_followers_current),sub:`${growthSign(K.x_followers_current,K.x_season_start)} this season`,accent:"#A8B8C8"},
        {icon:"🏆",label:"IG Engagement Rank",value:"#1",sub:"of 11 NFL Español",accent:GOLD},
        {icon:"🔥",label:"Jan Engagements",value:fmt(K.ig_jan_eng+K.tt_jan_eng+K.x_jan_eng),sub:"all platforms combined",accent:GREEN},
      ].map((k,i)=>(
        <div key={i} style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"20px 24px",display:"flex",flexDirection:"column",gap:4,borderTop:`3px solid ${k.accent}`}}>
          <div style={{fontSize:11,color:MUTED,textTransform:"uppercase",letterSpacing:1.5,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:14}}>{k.icon}</span>{k.label}
          </div>
          <div style={{fontSize:28,fontWeight:800,color:TEXT,letterSpacing:-1,lineHeight:1.1}}>{k.value}</div>
          <div style={{fontSize:12,color:k.accent,fontWeight:600}}>{k.sub}</div>
        </div>
      ))}
    </div>

    {/* Era highlights */}
    <div style={{marginTop:20,background:`linear-gradient(135deg, ${CARD} 0%, #0F1D2F 100%)`,border:`1px solid ${BORDER}`,borderRadius:12,padding:"20px 28px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(170px, 1fr))",gap:20}}>
      {[
        {label:"IG Followers",val:growthSign(K.ig_followers_current,K.ig_era_start),sub:`${fmt(K.ig_era_start)} → ${fmt(K.ig_followers_current)}`},
        {label:"IG Engagement",val:`+${growth(D.m.ig.engagements[29],D.m.ig.engagements[12])}%`,sub:`${fmt(D.m.ig.engagements[12])} → ${fmt(D.m.ig.engagements[29])}/mo`},
        {label:"TT Followers",val:growthSign(K.tt_followers_current,K.tt_era_start),sub:`${fmt(K.tt_era_start)} → ${fmt(K.tt_followers_current)}`},
        {label:"TT Engagement",val:`+${growth(D.m.tt.engagements[29],D.m.tt.engagements[12])}%`,sub:`${fmt(D.m.tt.engagements[12])} → ${fmt(D.m.tt.engagements[29])}/mo`},
        {label:"X Engagement",val:`+${growth(D.m.x.engagements[29],D.m.x.engagements[12])}%`,sub:`${fmt(D.m.x.engagements[12])} → ${fmt(D.m.x.engagements[29])}/mo`},
      ].map((item,i)=>(
        <div key={i} style={{textAlign:"center"}}>
          <div style={{fontSize:10,color:SILVER,textTransform:"uppercase",letterSpacing:1.2,fontWeight:600,marginBottom:4}}>{item.label}</div>
          <div style={{fontSize:24,fontWeight:800,color:GREEN,letterSpacing:-0.5}}>{item.val}</div>
          <div style={{fontSize:11,color:MUTED,marginTop:2}}>{item.sub}</div>
        </div>
      ))}
      <div style={{gridColumn:"1 / -1",textAlign:"center",borderTop:`1px solid ${BORDER}`,paddingTop:12,marginTop:4}}>
        <span style={{fontSize:11,color:MUTED,letterSpacing:0.5}}>FULL VIBRA SPORTS ERA {"·"} Aug 2024 {"→"} Feb 2026</span>
      </div>
    </div>

    {/* TREND CHARTS */}
    <SectionHeader number="01" title="Performance Trends" subtitle={range.desc}/>
    <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
      <div style={{display:"flex",gap:4,marginRight:16}}>
        {[["followers","Followers"],["engagements","Engagements"],["impressions","Impressions"]].map(([k,l])=>
          <Tab key={k} active={chartView===k} onClick={()=>setChartView(k)}>{l}</Tab>
        )}
      </div>
      <div style={{display:"flex",gap:4,marginRight:16}}>
        <Tab active={platform==="all"} onClick={()=>setPlatform("all")}>All</Tab>
        {Object.entries(platformNames).map(([k,v])=>
          <Tab key={k} active={platform===k} onClick={()=>setPlatform(k)}>{platformIcons[k]} {v}</Tab>
        )}
      </div>
      <div style={{display:"flex",gap:4}}>
        {Object.entries(timeRanges).map(([key,val])=>
          <Tab key={key} active={timeRange===key} onClick={()=>setTimeRange(key)}>{val.label}</Tab>
        )}
      </div>
    </div>
    <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"24px 20px 16px"}}>
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={chartDataMap[chartView]} margin={{top:5,right:20,bottom:5,left:10}}>
          <defs>
            {Object.entries(lineColors).map(([name,color])=>(
              <linearGradient key={name} id={`ga-${name.replace(/[^a-z]/gi,'')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.25}/><stop offset="100%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={BORDER}/>
          <XAxis dataKey="month" tick={{fontSize:10,fill:MUTED}} interval={Math.max(0,Math.floor(months.length/10))}/>
          <YAxis tick={{fontSize:10,fill:MUTED}} tickFormatter={fmt} width={55}/>
          <Tooltip content={<ChartTooltip/>}/>
          {platformsToShow.map(name=>
            <Area key={name} type="monotone" dataKey={name} stroke={lineColors[name]} strokeWidth={2.5} fill={`url(#ga-${name.replace(/[^a-z]/gi,'')})`} dot={false} connectNulls/>
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>

    {/* SEASON OVER SEASON */}
    <SectionHeader number="02" title="Season Over Season" subtitle={"Year 1 (Aug 2024 → Jul 2025) vs Year 2 (Aug 2025 → Feb 2026)"}/>
    <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"100px 80px repeat(3, 1fr) repeat(3, 1fr)",fontSize:11,fontWeight:700,color:MUTED,textTransform:"uppercase",letterSpacing:0.8,padding:"12px 20px",borderBottom:`1px solid ${BORDER}`,background:CARD2}}>
        <div>Platform</div><div>Metric</div>
        <div style={{gridColumn:"3/6",textAlign:"center",color:SILVER}}>Year 1</div>
        <div style={{gridColumn:"6/9",textAlign:"center",color:TEXT}}>This Season</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"100px 80px repeat(3, 1fr) repeat(3, 1fr)",fontSize:10,fontWeight:600,color:MUTED,padding:"6px 20px",borderBottom:`1px solid ${BORDER}`}}>
        <div/><div/>
        {["Start","End","Growth","Start","Current","Growth"].map((h,i)=><div key={i} style={{textAlign:"center"}}>{h}</div>)}
      </div>
      {seasonComparison.map((row,i)=>(
        <div key={i} style={{display:"grid",gridTemplateColumns:"100px 80px repeat(3, 1fr) repeat(3, 1fr)",padding:"10px 20px",borderBottom:i<5?`1px solid ${BORDER}`:"none",background:i%2===0?"transparent":`${CARD2}40`,fontSize:13,alignItems:"center"}}>
          <div style={{fontWeight:600,color:TEXT,fontSize:12}}>{i%2===0?row.platform:""}</div>
          <div style={{color:MUTED,fontSize:11}}>{row.metric}</div>
          <div style={{textAlign:"center",color:MUTED}}>{row.y1Start}</div>
          <div style={{textAlign:"center",color:MUTED}}>{row.y1End}</div>
          <div style={{textAlign:"center",color:row.y1Bad?"#EF4444":MUTED,fontWeight:600}}>{row.y1Growth}</div>
          <div style={{textAlign:"center",color:TEXT}}>{row.y2Start}</div>
          <div style={{textAlign:"center",color:TEXT,fontWeight:700}}>{row.y2Current}</div>
          <div style={{textAlign:"center",color:row.hot?GREEN:MUTED,fontWeight:700,fontSize:14}}>{row.y2Growth}</div>
        </div>
      ))}
    </div>

    {/* COMPETITIVE BENCHMARKING */}
    <SectionHeader number="03" title="Competitive Benchmarking" subtitle={"Patriots position among 11 IG and 5 TT NFL Español accounts"}/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
      {[{label:"IG Engagement Rank (of 11)",ranks:igRanks},{label:"TT Engagement Rank (of 5)",ranks:ttRanks}].map((section,si)=>(
        <div key={si} style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"16px 20px"}}>
          <div style={{fontSize:12,fontWeight:700,color:TEXT,marginBottom:12}}>{section.label}</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {D.ci.months.map((m,i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{fontSize:9,color:MUTED,marginBottom:4}}>{m.replace(" 25","'25").replace(" 26","'26")}</div>
                <RankBadge rank={section.ranks[i]}/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Competitor chart */}
    <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"20px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <span style={{fontSize:13,fontWeight:700,color:TEXT}}>IG Competitors {"—"} All Accounts</span>
        <div style={{display:"flex",gap:4}}>
          <Tab active={compMetric==="engagement"} onClick={()=>setCompMetric("engagement")}>Engagement</Tab>
          <Tab active={compMetric==="followers"} onClick={()=>setCompMetric("followers")}>Followers</Tab>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={compEngData}>
          <CartesianGrid strokeDasharray="3 3" stroke={BORDER}/>
          <XAxis dataKey="month" tick={{fontSize:10,fill:MUTED}}/>
          <YAxis tick={{fontSize:10,fill:MUTED}} tickFormatter={compMetric==="engagement"?(v)=>(v*100).toFixed(0)+"%":fmt} width={50}/>
          <Tooltip content={<ChartTooltip/>}/>
          {D.ci.accounts.map((name,i)=>
            <Line key={name} type="monotone" dataKey={name} stroke={name.includes("Patriots")?RED:`hsl(${i*32},40%,55%)`} strokeWidth={name.includes("Patriots")?3:1} dot={false} strokeOpacity={name.includes("Patriots")?1:0.5} connectNulls/>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Snapshot table */}
    <div style={{marginTop:16,background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"16px 20px"}}>
      <div style={{fontSize:13,fontWeight:700,color:TEXT,marginBottom:12}}>Jan 2026 {"—"} IG Engagement vs Followers</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 100px 100px"}}>
        {["Account","Followers","Engagement"].map((h,hi)=>(
          <div key={hi} style={{fontSize:10,color:MUTED,fontWeight:700,textTransform:"uppercase",padding:"6px 0",borderBottom:`1px solid ${BORDER}`,letterSpacing:1,textAlign:hi>0?"right":"left"}}>{h}</div>
        ))}
        {topCompetitors.map((c,i)=>{
          const isP=c.name.includes("Patriots");
          return[
            <div key={`n${i}`} style={{padding:"8px 0",borderBottom:`1px solid ${BORDER}`,fontWeight:isP?700:400,color:isP?RED:TEXT,fontSize:12}}>{isP?"🏆 ":""}{c.name}</div>,
            <div key={`f${i}`} style={{padding:"8px 0",borderBottom:`1px solid ${BORDER}`,textAlign:"right",color:MUTED,fontSize:12}}>{fmt(c.followers)}</div>,
            <div key={`e${i}`} style={{padding:"8px 0",borderBottom:`1px solid ${BORDER}`,textAlign:"right",fontWeight:isP?700:400,color:isP?GREEN:TEXT,fontSize:12}}>{pct(c.engagement)}</div>,
          ];
        })}
      </div>
    </div>

    {/* INSIGHTS */}
    <SectionHeader number="04" title="Key Insights"/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      {[
        {icon:"🏆",title:"David vs Goliath",text:"#6 in followers yet #1 in engagement — beating 49ers, Chiefs, Cowboys with 2–3× more followers."},
        {icon:"📈",title:"Season 2 Acceleration",text:"IG +86%, TT +224% this season. Engagement volume 3× higher than Year 1 on a per-month basis."},
        {icon:"🏈",title:"Super Bowl Explosion",text:"502K TT engagements in SB week. TT spiked 40K → 68K followers (+69%) in a single week."},
        {icon:"🎯",title:"Content Quality",text:"IG ER held 3.5–6.2% all season — well above 1–3% industry benchmark for sports accounts."},
        {icon:"🚀",title:"TikTok Breakout",text:"TT nearly matched IG (67.6K vs 69K) — up from 9K at takeover. +629% total."},
        {icon:"📊",title:"Consistent Dominance",text:"Top 3 IG engagement 5 of last 6 months. Hit #1 three times. Sustained strategy, not a fluke."},
      ].map((ins,i)=>(
        <div key={i} style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"16px 20px",display:"flex",gap:12,alignItems:"flex-start"}}>
          <span style={{fontSize:22,flexShrink:0,marginTop:2}}>{ins.icon}</span>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:TEXT,marginBottom:4}}>{ins.title}</div>
            <div style={{fontSize:12,color:MUTED,lineHeight:1.5}}>{ins.text}</div>
          </div>
        </div>
      ))}
    </div>

    {/* TAKEAWAYS */}
    <div style={{marginTop:32,background:`linear-gradient(135deg, #1A1400 0%, #0F1D2F 100%)`,border:`1px solid ${GOLD}30`,borderRadius:12,padding:"24px 28px"}}>
      <div style={{fontSize:14,fontWeight:800,color:GOLD,marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
        <span>{"🎖"}</span> EXECUTIVE TAKEAWAYS
      </div>
      {[
        "Season 2 is a breakout: IG followers +86%, TT +224%, engagement 3× Year 1 levels. The Vibra Sports content strategy is compounding.",
        "Patriots Español is the #1 engaged NFL Español brand — outperforming accounts with 2–3× more followers. Quality over quantity.",
        "Super Bowl proved scalability: 500K+ TT engagements, 260K+ IG engagements, 69% TT follower growth in one week.",
        "TikTok has nearly caught Instagram in followers (67.6K vs 69K). Continued TT investment has the highest ROI for audience growth.",
      ].map((text,i)=>(
        <div key={i} style={{display:"flex",gap:12,marginBottom:i<3?12:0}}>
          <span style={{color:RED,fontWeight:800,fontSize:16,minWidth:20}}>{i+1}</span>
          <span style={{fontSize:13,color:"#D4C9A8",lineHeight:1.6}}>{text}</span>
        </div>
      ))}
    </div>
  </div>);
}

export default function PatriotsDashboard(){
  const[activeTab,setActiveTab]=useState("exec");
  const { isMobile, isSmall } = useResponsive();
  return(
    <div style={{background:BG,minHeight:"100vh",color:TEXT,fontFamily:"'DM Sans', 'Helvetica Neue', sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{background:NAVY,padding:isSmall?"16px 12px 0":"28px 40px 0",borderBottom:`3px solid ${RED}`}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:20}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
                <span style={{fontSize:isSmall?24:28}}>🏈</span>
                <h1 style={{fontSize:isSmall?20:26,fontWeight:800,margin:0,letterSpacing:-0.5}}>PATRIOTS ESPAÑOL</h1>
              </div>
              <p style={{color:SILVER,fontSize:isSmall?11:13,margin:0,letterSpacing:0.5}}>
                Managed by <span style={{color:RED,fontWeight:700}}>Vibra Sports</span>&nbsp;&nbsp;·&nbsp;&nbsp;Data through Feb 17, 2026
              </p>
            </div>
          </div>
          <div style={{display:"flex",gap:0,flexWrap:"wrap"}}>
            {[
              {key:"exec",label:"📋 Executive Summary"},
              {key:"comp",label:"🏆 Competitor Benchmarking"},
              {key:"analytics",label:"📊 Full Analytics"},
            ].map(tab=>(
              <button key={tab.key} onClick={()=>setActiveTab(tab.key)} style={{
                background:activeTab===tab.key?BG:"transparent",
                color:activeTab===tab.key?TEXT:SILVER,
                border:"none",borderRadius:"8px 8px 0 0",
                padding:isSmall?"8px 12px":"10px 24px",fontSize:isSmall?11:13,
                fontWeight:activeTab===tab.key?700:500,
                cursor:"pointer",letterSpacing:0.3,
                transition:"all 0.2s",
                borderBottom:activeTab===tab.key?`2px solid ${RED}`:"2px solid transparent",
              }}>{tab.label}</button>
            ))}
          </div>
        </div>
      </div>
      {activeTab==="exec"?<ExecSummary/>:activeTab==="comp"?<CompBenchmark/>:<FullAnalytics/>}
      <div className="dashboard-container" style={{maxWidth:1200,margin:"0 auto",padding:isSmall?"0 12px":isMobile?"0 16px":"0 40px"}}>
        <div style={{textAlign:"center",padding:"16px 0 24px",borderTop:`1px solid ${BORDER}`}}>
          <span style={{fontSize:11,color:MUTED,letterSpacing:1}}>
            PATRIOTS ESPAÑOL&nbsp;&nbsp;·&nbsp;&nbsp;MANAGED BY VIBRA SPORTS&nbsp;&nbsp;·&nbsp;&nbsp;DATA THROUGH FEB 17, 2026&nbsp;&nbsp;·&nbsp;&nbsp;CONFIDENTIAL
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CALYBRAT — landing page runtime
   1. Industry dataset (powers the live studio)
   2. i18n dictionary
   3. Studio engine
   4. Page interactions
   ═══════════════════════════════════════════════════════════════════ */

/* ── 1. INDUSTRY DATASET ─────────────────────────────────────────
   Every string is {es, en}; numbers are shared. All figures are
   fabricated demo data, plausible for each sector.                */

const IND = [
{
  id:'manufactura', ico:'🏭',
  name:{es:'Manufactura',en:'Manufacturing'},
  co:'Industrias del Valle S.A.S.',
  sector:{es:'Metalmecánica · 2 plantas',en:'Metalworking · 2 plants'},
  src:{es:'Siigo + planta · sync hace 4 min',en:'Siigo + shop floor · synced 4 min ago'},
  title:{es:'Dashboard de Operación',en:'Operations Dashboard'},
  sub:{es:'Planta Yumbo y Planta Itagüí · corte de hoy 4:12 p.m.',en:'Yumbo & Itagüí plants · as of today 4:12 p.m.'},
  mods:[{i:'📊',n:{es:'Dashboard',en:'Dashboard'}},{i:'🏭',n:{es:'Producción',en:'Production'}},{i:'📦',n:{es:'Materias primas',en:'Raw materials'}},{i:'💰',n:{es:'Ventas',en:'Sales'}},{i:'📋',n:{es:'Cartera',en:'Receivables'}},{i:'✦',n:{es:'Agente IA',en:'AI Agent'}}],
  mv:[
  { sub:{es:'Planta Yumbo y Planta Itagüí · turnos del día',en:'Yumbo & Itagüí plants · today\'s shifts'},
    kpis:[
      {l:{es:'OEE Yumbo',en:'Yumbo OEE'},v:'84%',d:{es:'↑ 2 pp vs agosto',en:'↑ 2 pp vs August'},t:'ok',c:'c'},
      {l:{es:'OEE Itagüí',en:'Itagüí OEE'},v:'71%',d:{es:'meta 82%',en:'target 82%'},t:'err',c:'e'},
      {l:{es:'Unidades hoy',en:'Units today'},v:'1.240',d:{es:'turno día · ↑ 6%',en:'day shift · ↑ 6%'},t:'ok',c:'g'},
      {l:{es:'Alistamiento prom.',en:'Avg. changeover'},v:'34 min',d:{es:'Itagüí 47 · Yumbo 22',en:'Itagüí 47 · Yumbo 22'},t:'warn',c:''}],
    chart:{t:{es:'Unidades producidas por día · esta semana',en:'Units produced per day · this week'},v:{es:'Ambas plantas combinadas',en:'Both plants combined'},
      bars:[210,238,195,260,221,248,268],lbls:['L','M','M','J','V','S','D']},
    alert:{es:'Itagüí promedia <b>47 min</b> de alistamiento por cambio de referencia contra <b>22 min</b> en Yumbo — cerrar la brecha vale cerca de <b>$31M/mes</b> en producción adicional.',en:'Itagüí averages <b>47 min</b> per changeover vs <b>22 min</b> in Yumbo — closing the gap is worth about <b>$31M/month</b> in extra output.'},
    rank:{t:{es:'Rendimiento por línea',en:'Performance by line'},items:[
      {n:{es:'Corte',en:'Cutting'},v:'91%',p:91},{n:{es:'Soldadura',en:'Welding'},v:'78%',p:78},
      {n:{es:'Ensamble',en:'Assembly'},v:'66%',p:66},{n:{es:'Pintura',en:'Painting'},v:'54%',p:54}]} },
  { sub:{es:'Stock crítico y consumo proyectado',en:'Critical stock and projected consumption'},
    kpis:[
      {l:{es:'Lámina CR cal.18',en:'18-ga CR sheet'},v:'14%',d:{es:'cubre 6 días',en:'covers 6 days'},t:'err',c:'e'},
      {l:{es:'Acero inoxidable',en:'Stainless steel'},v:'61%',d:{es:'cubre 24 días',en:'covers 24 days'},t:'ok',c:''},
      {l:{es:'Consumo semanal',en:'Weekly consumption'},v:'18,4 t',d:{es:'↑ 9% vs prom.',en:'↑ 9% vs avg'},t:'warn',c:'c'},
      {l:{es:'OCs pendientes',en:'Open POs'},v:'4',d:{es:'por $92M',en:'worth $92M'},t:'warn',c:''}],
    chart:{t:{es:'Consumo de lámina CR · últimas 8 semanas',en:'CR sheet consumption · last 8 weeks'},v:{es:'Alza sostenida desde julio',en:'Steady rise since July'},
      bars:[9.2,10.1,9.8,11.4,12.6,13.1,14.8,15.2],lbls:['S30','S31','S32','S33','S34','S35','S36','S37']},
    alert:{es:'<b>Lámina CR calibre 18</b> al 14% de stock — cubre 6 días y el proveedor entrega en 9. Hay 3 OPs que la necesitan.',en:'<b>18-gauge CR sheet</b> at 14% stock — covers 6 days, supplier lead time is 9. Three work orders need it.'},
    rank:{t:{es:'Insumos críticos por cobertura',en:'Critical inputs by coverage'},items:[
      {n:{es:'Lámina CR cal.18',en:'18-ga CR sheet'},v:{es:'6 días',en:'6 days'},p:20},{n:{es:'Pintura poliuretano',en:'Polyurethane paint'},v:{es:'11 días',en:'11 days'},p:37},
      {n:{es:'Electrodos soldadura',en:'Welding electrodes'},v:{es:'18 días',en:'18 days'},p:60},{n:{es:'Acero inoxidable',en:'Stainless steel'},v:{es:'24 días',en:'24 days'},p:80}]} },
  { sub:{es:'Cotizaciones y pedidos industriales',en:'Industrial quotes and orders'},
    kpis:[
      {l:{es:'Ventas del mes',en:'Monthly sales'},v:'$412M',d:{es:'↑ 9.2% vs agosto',en:'↑ 9.2% vs August'},t:'ok',c:'g'},
      {l:{es:'Cotizaciones activas',en:'Active quotes'},v:'31',d:{es:'por $680M',en:'worth $680M'},t:'ok',c:''},
      {l:{es:'Tasa de cierre',en:'Close rate'},v:'38%',d:{es:'↓ 5 pp',en:'↓ 5 pp'},t:'warn',c:'c'},
      {l:{es:'Margen cotizado',en:'Quoted margin'},v:'21%',d:{es:'vs 23.4% ejecutado',en:'vs 23.4% actual'},t:'err',c:''}],
    chart:{t:{es:'Ventas cotizadas vs cerradas · 8 semanas',en:'Quoted vs closed sales · 8 weeks'},v:{es:'La brecha crece desde el alza del acero',en:'Gap widening since steel prices rose'},
      bars:[48,52,61,58,66,71,64,74],lbls:['S30','S31','S32','S33','S34','S35','S36','S37']},
    alert:{es:'Cotizaron <b>23 órdenes</b> con el precio viejo de la lámina antes del alza de agosto — ya salen con el precio corregido, pero explican la caída de margen del mes.',en:'<b>23 orders</b> were quoted at the old sheet-metal price before the August increase — new quotes are corrected, but this explains this month\'s margin drop.'},
    rank:{t:{es:'Ventas por cliente industrial',en:'Sales by industrial client'},items:[
      {n:{es:'Aceros del Cauca',en:'Aceros del Cauca'},v:'$86M',p:100},{n:{es:'Ensamblajes JR',en:'Ensamblajes JR'},v:'$64M',p:74},
      {n:{es:'Metalúrgica Andina',en:'Metalúrgica Andina'},v:'$51M',p:59},{n:{es:'Talleres Unidos',en:'Talleres Unidos'},v:'$38M',p:44}]} },
  { sub:{es:'Cartera de clientes industriales',en:'Industrial client receivables'},
    kpis:[
      {l:{es:'Cartera total',en:'Total receivables'},v:'$187M',d:{es:'',en:''},t:'',c:''},
      {l:{es:'Cartera vencida',en:'Overdue AR'},v:'$34M',d:{es:'18% del total',en:'18% of total'},t:'err',c:'e'},
      {l:{es:'DSO',en:'DSO'},v:'52 días',d:{es:'meta 40',en:'target 40'},t:'warn',c:'c'},
      {l:{es:'Clientes en mora',en:'Clients overdue'},v:'5',d:{es:'de 34 activos',en:'of 34 active'},t:'err',c:''}],
    chart:{t:{es:'Cartera vencida por antigüedad',en:'Overdue AR by age'},v:{es:'Concentrada en 31-60 días',en:'Concentrated at 31-60 days'},
      bars:[8,14,9,3],lbls:['1-30','31-60','61-90','+90']},
    alert:{es:'<b>Metalúrgica Andina</b> concentra $14M de cartera vencida a 61 días — es el 41% del total vencido y sigue recibiendo despachos.',en:'<b>Metalúrgica Andina</b> holds $14M overdue at 61 days — 41% of total overdue AR, and still receiving shipments.'},
    rank:{t:{es:'Cartera vencida por cliente',en:'Overdue AR by client'},items:[
      {n:{es:'Metalúrgica Andina',en:'Metalúrgica Andina'},v:'$14M',p:100},{n:{es:'Talleres Unidos',en:'Talleres Unidos'},v:'$9M',p:64},
      {n:{es:'Ensamblajes JR',en:'Ensamblajes JR'},v:'$6M',p:43},{n:{es:'Grupo Ferretero Sur',en:'Grupo Ferretero Sur'},v:'$3M',p:21}]} }
  ],
  kpis:[
    {l:{es:'Ventas del mes',en:'Monthly sales'},v:'$412M',d:{es:'↑ 9.2% vs agosto',en:'↑ 9.2% vs August'},t:'ok',c:'g'},
    {l:{es:'Margen bruto',en:'Gross margin'},v:'23.4%',d:{es:'↓ 1.1 pp · alza del acero',en:'↓ 1.1 pp · steel prices'},t:'err',c:''},
    {l:{es:'OEE promedio',en:'Average OEE'},v:'78%',d:{es:'meta 82%',en:'target 82%'},t:'warn',c:'c'},
    {l:{es:'Órdenes atrasadas',en:'Late orders'},v:'6',d:{es:'de 47 activas',en:'of 47 active'},t:'err',c:'e'}],
  chart:{t:{es:'Unidades producidas por semana',en:'Units produced per week'},v:{es:'Últimas 8 semanas',en:'Last 8 weeks'},
    bars:[62,74,58,81,69,88,72,94],lbls:['S30','S31','S32','S33','S34','S35','S36','S37']},
  alert:{es:'<b>Lámina CR calibre 18</b> al 14% de stock — cubre 6 días y el proveedor entrega en 9. Hay 3 OPs que la necesitan.',en:'<b>18-gauge CR sheet</b> at 14% stock — covers 6 days, supplier lead time is 9. Three work orders need it.'},
  rank:{t:{es:'Órdenes de producción activas',en:'Active work orders'},items:[
    {n:'OP-2481 · Tanque 5.000L',v:'92%',p:92},{n:{es:'OP-2495 · Estructura nave 4',en:'OP-2495 · Bay 4 structure'},v:'74%',p:74},
    {n:{es:'OP-2502 · Ductos ventilación',en:'OP-2502 · Vent ducts'},v:'61%',p:61},{n:{es:'OP-2510 · Tolvas x12',en:'OP-2510 · Hoppers x12'},v:'38%',p:38},
    {n:{es:'OP-2514 · Bandas transporte',en:'OP-2514 · Conveyors'},v:'12%',p:12}]},
  qa:[
    {q:{es:'¿Por qué cayó el margen este mes?',en:'Why did margin drop this month?'},
     a:{es:'Cayó <span class="neg">1.1 pp</span> y el 80% se explica por una sola cosa: la lámina CR subió <span class="num">14%</span> en agosto y ustedes cotizaron 23 órdenes con el precio viejo. Las OPs 2481, 2495 y 2502 se están fabricando por debajo del margen objetivo. Las cotizaciones nuevas ya salen con el precio corregido.',
        en:'It fell <span class="neg">1.1 pp</span> and 80% comes down to one thing: CR sheet went up <span class="num">14%</span> in August and you quoted 23 orders at the old price. Work orders 2481, 2495 and 2502 are being built below target margin. New quotes already use the corrected price.'}},
    {q:{es:'¿Qué órdenes van a llegar tarde?',en:'Which orders will be late?'},
     a:{es:'<b>3 órdenes</b> no llegan a la fecha prometida al ritmo actual:<br>· OP-2510 Tolvas — <span class="neg">7 días tarde</span><br>· OP-2514 Bandas — <span class="neg">4 días tarde</span><br>· OP-2502 Ductos — <span class="neg">2 días tarde</span><br>Las tres dependen de la misma lámina en escasez. Si adelantan la orden de compra hoy, recuperan dos de ellas.',
        en:'<b>3 orders</b> will miss the promised date at current pace:<br>· OP-2510 Hoppers — <span class="neg">7 days late</span><br>· OP-2514 Conveyors — <span class="neg">4 days late</span><br>· OP-2502 Ducts — <span class="neg">2 days late</span><br>All three depend on the same sheet metal that is short. Placing the PO today recovers two of them.'}},
    {q:{es:'¿Qué planta rinde más?',en:'Which plant performs better?'},
     a:{es:'Yumbo: OEE <span class="pos">84%</span>. Itagüí: <span class="neg">71%</span>. La diferencia no es la máquina — es el <b>alistamiento</b>: Itagüí promedia 47 min por cambio de referencia contra 22 min en Yumbo. Igualar ese tiempo valdría cerca de <span class="num">$31M</span> más de producción al mes.',
        en:'Yumbo: OEE <span class="pos">84%</span>. Itagüí: <span class="neg">71%</span>. The gap is not the machine — it is <b>changeover</b>: Itagüí averages 47 min per setup vs 22 min in Yumbo. Closing that gap is worth about <span class="num">$31M</span> more output per month.'}}]
},
{
  id:'distribucion', ico:'🚛',
  name:{es:'Distribución',en:'Distribution'},
  co:'Distribuidora Andina S.A.S.',
  sector:{es:'Alimentos · 14 rutas',en:'Food · 14 routes'},
  src:{es:'Siigo + POS móvil · sync hace 2 min',en:'Siigo + mobile POS · synced 2 min ago'},
  title:{es:'Dashboard Comercial',en:'Commercial Dashboard'},
  sub:{es:'14 rutas activas · 428 clientes tienda a tienda',en:'14 active routes · 428 store-to-store clients'},
  mods:[{i:'📊',n:{es:'Dashboard',en:'Dashboard'}},{i:'💰',n:{es:'Ventas',en:'Sales'}},{i:'🚚',n:{es:'Rutas',en:'Routes'}},{i:'📦',n:{es:'Inventario',en:'Inventory'}},{i:'📋',n:{es:'Cartera',en:'Receivables'}},{i:'✦',n:{es:'Agente IA',en:'AI Agent'}}],
  mv:[
  { sub:{es:'Facturación por categoría del mes',en:'Monthly billing by category'},
    kpis:[
      {l:{es:'Ventas del mes',en:'Monthly sales'},v:'$389M',d:{es:'↑ 12.4% vs anterior',en:'↑ 12.4% vs last month'},t:'ok',c:'g'},
      {l:{es:'Ticket promedio',en:'Average ticket'},v:'$79K',d:{es:'↓ vs meta $95K',en:'↓ vs $95K target'},t:'warn',c:''},
      {l:{es:'Pedidos del mes',en:'Orders this month'},v:'4.920',d:{es:'↑ 6%',en:'↑ 6%'},t:'ok',c:''},
      {l:{es:'Clientes activos',en:'Active clients'},v:'428',d:{es:'de 512 registrados',en:'of 512 registered'},t:'ok',c:'c'}],
    chart:{t:{es:'Ventas por categoría del mes',en:'Sales by category this month'},v:{es:'Lácteos lidera, bebidas crece más rápido',en:'Dairy leads, beverages growing fastest'},
      bars:[142,121,98,74,54],lbls:['Lácteos','Bebidas','Snacks','Otros','Aseo']},
    alert:{es:'La línea de <b>bebidas funcionales</b> ya es el 17% de la venta y crece 38% en 90 días — pero solo se ofrece en 2 de las 14 rutas.',en:'The <b>functional beverages</b> line is already 17% of sales and growing 38% in 90 days — but only offered on 2 of 14 routes.'},
    rank:{t:{es:'Ventas por categoría',en:'Sales by category'},items:[
      {n:{es:'Lácteos',en:'Dairy'},v:'$142M',p:100},{n:{es:'Bebidas',en:'Beverages'},v:'$121M',p:85},
      {n:{es:'Snacks',en:'Snacks'},v:'$98M',p:69},{n:{es:'Aseo',en:'Cleaning'},v:'$54M',p:38}]} },
  { sub:{es:'Cumplimiento y rentabilidad por ruta',en:'On-time delivery and profitability by route'},
    kpis:[
      {l:{es:'Entregas a tiempo',en:'On-time delivery'},v:'91%',d:{es:'↑ 4 pp',en:'↑ 4 pp'},t:'ok',c:'c'},
      {l:{es:'Costo por entrega',en:'Cost per delivery'},v:'$18,4K',d:{es:'↑ 7% combustible',en:'↑ 7% fuel'},t:'warn',c:''},
      {l:{es:'Ruta más rentable',en:'Most profitable route'},v:{es:'Ruta 3',en:'Route 3'},d:{es:'$21.4M margen',en:'$21.4M margin'},t:'ok',c:'g'},
      {l:{es:'Ruta en pérdida',en:'Route losing money'},v:{es:'Ruta 7',en:'Route 7'},d:{es:'-$2.6M',en:'-$2.6M'},t:'err',c:'e'}],
    chart:{t:{es:'Entregas a tiempo por ruta',en:'On-time delivery by route'},v:{es:'Ruta 7 muy por debajo',en:'Route 7 far below'},
      bars:[95,91,88,84,61],lbls:['R3','R1','R9','R5','R7']},
    alert:{es:'La <b>Ruta 7</b> tiene 118 km de recorrido, el ticket promedio más bajo ($79K) y acumula 41% de las devoluciones del mes — hoy pierde plata en cada despacho.',en:'<b>Route 7</b> covers 118 km, has the lowest average ticket ($79K) and accounts for 41% of monthly returns — it loses money on every dispatch today.'},
    rank:{t:{es:'Kilómetros recorridos por ruta',en:'Kilometers driven by route'},items:[
      {n:{es:'Ruta 7 · Sur',en:'Route 7 · South'},v:'118 km',p:100},{n:{es:'Ruta 9 · Occidente',en:'Route 9 · West'},v:'94 km',p:80},
      {n:{es:'Ruta 5 · Oriente',en:'Route 5 · East'},v:'81 km',p:69},{n:{es:'Ruta 1 · Norte',en:'Route 1 · North'},v:'62 km',p:53}]} },
  { sub:{es:'Cobertura y rotación por categoría',en:'Coverage and turnover by category'},
    kpis:[
      {l:{es:'Días de inventario',en:'Days of inventory'},v:'16',d:{es:'meta 20',en:'target 20'},t:'warn',c:'c'},
      {l:{es:'SKUs bajo mínimo',en:'SKUs below minimum'},v:'7',d:{es:'de 84 activos',en:'of 84 active'},t:'err',c:'e'},
      {l:{es:'Quiebres del mes',en:'Stockouts this month'},v:'3',d:{es:'',en:''},t:'err',c:''},
      {l:{es:'Rotación',en:'Turnover'},v:'4,2x',d:{es:'mensual',en:'monthly'},t:'ok',c:'g'}],
    chart:{t:{es:'Cobertura de inventario por categoría (días)',en:'Inventory coverage by category (days)'},v:{es:'Lácteos en riesgo',en:'Dairy at risk'},
      bars:[9,14,22,18,26],lbls:['Lácteos','Bebidas','Snacks','Aseo','Otros']},
    alert:{es:'<b>Lácteos</b> tiene solo 9 días de cobertura y es la categoría de mayor rotación — riesgo de quiebre antes de la próxima reposición.',en:'<b>Dairy</b> has only 9 days of cover and is the fastest-moving category — stockout risk before the next restock.'},
    rank:{t:{es:'SKUs con menor cobertura',en:'SKUs with lowest coverage'},items:[
      {n:{es:'Yogurt Natural 1L',en:'Plain Yogurt 1L'},v:{es:'4 días',en:'4 days'},p:13},{n:{es:'Queso Campesino 500g',en:'Fresh Cheese 500g'},v:{es:'6 días',en:'6 days'},p:20},
      {n:{es:'Jugo Cítrico 1L',en:'Citrus Juice 1L'},v:{es:'7 días',en:'7 days'},p:23},{n:{es:'Leche Entera 1L',en:'Whole Milk 1L'},v:{es:'9 días',en:'9 days'},p:30}]} },
  { sub:{es:'Cobros y clientes en mora',en:'Collections and overdue clients'},
    kpis:[
      {l:{es:'Cartera total',en:'Total receivables'},v:'$79M',d:{es:'',en:''},t:'',c:''},
      {l:{es:'Cartera vencida',en:'Overdue AR'},v:'$11M',d:{es:'14% del total',en:'14% of total'},t:'err',c:'e'},
      {l:{es:'DSO',en:'DSO'},v:'28 días',d:{es:'meta 21',en:'target 21'},t:'warn',c:'c'},
      {l:{es:'Clientes en mora',en:'Clients overdue'},v:'3',d:{es:'+30 días',en:'30+ days'},t:'err',c:''}],
    chart:{t:{es:'Cartera vencida por antigüedad',en:'Overdue AR by age'},v:{es:'Concentrada en 46-60 días',en:'Concentrated at 46-60 days'},
      bars:[3.2,5.1,1.8,0.9],lbls:['31-45','46-60','61-90','+90']},
    alert:{es:'<b>La Villa del Norte</b> lleva 62 días vencido con $3.1M y le siguieron despachando a crédito tres veces después de entrar en mora.',en:'<b>La Villa del Norte</b> is 62 days overdue on $3.1M and got three more credit shipments after going overdue.'},
    rank:{t:{es:'Cartera vencida por cliente',en:'Overdue AR by client'},items:[
      {n:{es:'La Villa del Norte',en:'La Villa del Norte'},v:'$3.1M',p:100},{n:{es:'Tienda Central',en:'Tienda Central'},v:'$1.8M',p:58},
      {n:{es:'Mercado Popular',en:'Mercado Popular'},v:'$940K',p:30},{n:{es:'Depósito Familiar',en:'Depósito Familiar'},v:'$600K',p:19}]} }
  ],
  kpis:[
    {l:{es:'Ventas del mes',en:'Monthly sales'},v:'$389M',d:{es:'↑ 12.4% vs anterior',en:'↑ 12.4% vs last month'},t:'ok',c:'g'},
    {l:{es:'Cartera vencida',en:'Overdue AR'},v:'$11M',d:{es:'3 clientes · +30 días',en:'3 clients · 30+ days'},t:'err',c:'e'},
    {l:{es:'Entregas a tiempo',en:'On-time delivery'},v:'91%',d:{es:'↑ 4 pp vs agosto',en:'↑ 4 pp vs August'},t:'ok',c:'c'},
    {l:{es:'Devoluciones',en:'Returns'},v:'2.8%',d:{es:'↑ 0.9 pp · revisar ruta 7',en:'↑ 0.9 pp · check route 7'},t:'err',c:''}],
  chart:{t:{es:'Ventas por día · últimas 2 semanas',en:'Daily sales · last 2 weeks'},v:{es:'Pico los jueves',en:'Peaks on Thursdays'},
    bars:[48,66,55,88,72,40,26,52,70,61,94,78,44,30],lbls:['L','M','M','J','V','S','D','L','M','M','J','V','S','D']},
  alert:{es:'<b>Ruta 7 (Sur)</b> acumula 41% de las devoluciones del mes con solo el 9% del volumen. Vale la pena revisar la cadena de frío.',en:'<b>Route 7 (South)</b> accounts for 41% of monthly returns with only 9% of volume. Worth checking the cold chain.'},
  rank:{t:{es:'Rentabilidad por ruta',en:'Profitability by route'},items:[
    {n:{es:'Ruta 3 · Centro',en:'Route 3 · Downtown'},v:'$21.4M',p:100},{n:{es:'Ruta 1 · Norte',en:'Route 1 · North'},v:'$18.9M',p:88},
    {n:{es:'Ruta 9 · Occidente',en:'Route 9 · West'},v:'$14.2M',p:66},{n:{es:'Ruta 5 · Oriente',en:'Route 5 · East'},v:'$9.8M',p:46},
    {n:{es:'Ruta 7 · Sur',en:'Route 7 · South'},v:'$2.1M',p:10}]},
  qa:[
    {q:{es:'¿Qué clientes tienen cartera vencida?',en:'Which clients are overdue?'},
     a:{es:'<b>3 clientes</b> pasan de 45 días:<br>· La Villa del Norte — <span class="neg">$3.1M</span> · 62 días<br>· Tienda Central — <span class="neg">$1.8M</span> · 48 días<br>· Mercado Popular — <span class="num">$940K</span> · 31 días<br>Total en riesgo alto: <span class="neg">$5.84M</span>. Ojo con La Villa del Norte: le siguieron despachando a crédito tres veces después de entrar en mora.',
        en:'<b>3 clients</b> are past 45 days:<br>· La Villa del Norte — <span class="neg">$3.1M</span> · 62 days<br>· Tienda Central — <span class="neg">$1.8M</span> · 48 days<br>· Mercado Popular — <span class="num">$940K</span> · 31 days<br>Total high risk: <span class="neg">$5.84M</span>. Note: La Villa del Norte got three more credit shipments after going overdue.'}},
    {q:{es:'¿La ruta 7 da o no da?',en:'Is route 7 worth keeping?'},
     a:{es:'Hoy no da. Vende <span class="num">$34M</span> pero deja solo <span class="num">$2.1M</span> de margen después de combustible, mano de obra y <span class="neg">$4.7M</span> en devoluciones. Es la ruta más larga (118 km) con el ticket promedio más bajo ($79K). Dos caminos: subir el mínimo de pedido a $150K, o repartir sus 38 clientes entre las rutas 5 y 9.',
        en:'Not today. It sells <span class="num">$34M</span> but leaves only <span class="num">$2.1M</span> after fuel, labor and <span class="neg">$4.7M</span> in returns. It is the longest route (118 km) with the lowest average ticket ($79K). Two options: raise the minimum order to $150K, or split its 38 clients between routes 5 and 9.'}},
    {q:{es:'¿Qué producto está creciendo más?',en:'Which product is growing fastest?'},
     a:{es:'La línea de <b>bebidas funcionales</b>: <span class="pos">+38%</span> en 90 días, ya es el 17% de la venta. Crece sobre todo en las rutas 1 y 3 (barrios de estrato alto). Dato accionable: en la ruta 9 solo la piden 4 de 61 clientes — ahí hay espacio evidente.',
        en:'The <b>functional beverages</b> line: <span class="pos">+38%</span> in 90 days, already 17% of sales. Growth is concentrated in routes 1 and 3 (higher-income neighborhoods). Actionable: in route 9 only 4 of 61 clients order it — clear headroom there.'}}]
},
{
  id:'retail', ico:'🛍️',
  name:{es:'Retail y consumo',en:'Retail & consumer'},
  co:'Marca Nativa',
  sector:{es:'D2C + grandes superficies',en:'D2C + big-box retail'},
  src:{es:'Shopify + Éxito + Rappi · sync hace 6 min',en:'Shopify + retail + Rappi · synced 6 min ago'},
  title:{es:'Dashboard Omnicanal',en:'Omnichannel Dashboard'},
  sub:{es:'7 canales · 3 países · sell-in vs sell-out',en:'7 channels · 3 countries · sell-in vs sell-out'},
  mods:[{i:'📊',n:{es:'Dashboard',en:'Dashboard'}},{i:'🛒',n:{es:'Canales',en:'Channels'}},{i:'📈',n:{es:'Sell-out',en:'Sell-out'}},{i:'📦',n:{es:'Inventario',en:'Inventory'}},{i:'📣',n:{es:'Marketing',en:'Marketing'}},{i:'✦',n:{es:'Agente IA',en:'AI Agent'}}],
  mv:[
  { sub:{es:'Utilidad real por canal de venta',en:'Real profit by sales channel'},
    kpis:[
      {l:{es:'Venta D2C',en:'D2C sales'},v:'$118M',d:{es:'margen 46%',en:'46% margin'},t:'ok',c:'g'},
      {l:{es:'Venta Éxito',en:'Éxito sales'},v:'$142M',d:{es:'margen 22%',en:'22% margin'},t:'warn',c:''},
      {l:{es:'Venta Rappi',en:'Rappi sales'},v:'$58M',d:{es:'↑ 22%',en:'↑ 22%'},t:'ok',c:'c'},
      {l:{es:'Tiendas naturistas',en:'Health stores'},v:'$34M',d:{es:'↓ 4%',en:'↓ 4%'},t:'err',c:''}],
    chart:{t:{es:'Participación de canal en la utilidad total',en:'Channel share of total profit'},v:{es:'D2C domina la utilidad, no el volumen',en:'D2C dominates profit, not volume'},
      bars:[54,22,12,7,5],lbls:['D2C','Éxito','Carulla','Rappi','Nat.']},
    alert:{es:'Cada peso movido de retail a D2C vale más del doble en utilidad — el freno es el CAC, ya en $38K y subiendo.',en:'Every peso shifted from retail to D2C is worth more than double in profit — the limit is CAC, now at $38K and rising.'},
    rank:{t:{es:'Utilidad por canal',en:'Profit by channel'},items:[
      {n:'D2C',v:'$54M',p:100},{n:'Éxito',v:'$31M',p:57},
      {n:'Carulla',v:'$19M',p:35},{n:'Rappi',v:'$12M',p:22}]} },
  { sub:{es:'Rotación en góndola por referencia',en:'Shelf turnover by SKU'},
    kpis:[
      {l:{es:'Sell-out Éxito',en:'Éxito sell-out'},v:'78%',d:{es:'del sell-in',en:'of sell-in'},t:'ok',c:''},
      {l:{es:'Días en góndola',en:'Days on shelf'},v:'11',d:{es:'referencia estrella',en:'hero SKU'},t:'err',c:'e'},
      {l:{es:'Quiebres del mes',en:'Stockouts this month'},v:'4',d:{es:'',en:''},t:'err',c:''},
      {l:{es:'Rotación promedio',en:'Average turnover'},v:'3,2x',d:{es:'mensual',en:'monthly'},t:'ok',c:'c'}],
    chart:{t:{es:'Sell-out semanal en Éxito',en:'Weekly sell-out at Éxito'},v:{es:'Cae por quiebre de Granola',en:'Drops from Granola stockout'},
      bars:[88,91,84,52,61,74,80],lbls:['S31','S32','S33','S34','S35','S36','S37']},
    alert:{es:'<b>Éxito</b> tiene 11 días de inventario de tu referencia estrella. Si no despachas esta semana, pierdes el espacio en góndola.',en:'<b>Éxito</b> has 11 days of inventory of your hero SKU. Ship this week or you lose the shelf space.'},
    rank:{t:{es:'Sell-out por referencia (Éxito)',en:'Sell-out by SKU (Éxito)'},items:[
      {n:{es:'Barra Proteica x12',en:'Protein Bar x12'},v:'94%',p:94},{n:{es:'Mantequilla de maní',en:'Peanut Butter'},v:'81%',p:81},
      {n:{es:'Mix Frutos Secos',en:'Nut Mix'},v:'68%',p:68},{n:{es:'Granola Premium 500g',en:'Premium Granola 500g'},v:'52%',p:52}]} },
  { sub:{es:'Cobertura por referencia y bodega',en:'Coverage by SKU and warehouse'},
    kpis:[
      {l:{es:'Días de inventario',en:'Days of inventory'},v:'22',d:{es:'2 refs por agotarse',en:'2 SKUs about to stock out'},t:'warn',c:'e'},
      {l:{es:'SKUs críticos',en:'Critical SKUs'},v:'2',d:{es:'',en:''},t:'err',c:''},
      {l:{es:'Inventario total',en:'Total inventory'},v:'$214M',d:{es:'',en:''},t:'ok',c:''},
      {l:{es:'Bodega con exceso',en:'Warehouse with surplus'},v:{es:'Cali',en:'Cali'},d:{es:'40 días de sobra',en:'40 days to spare'},t:'ok',c:'g'}],
    chart:{t:{es:'Cobertura de inventario por SKU (días)',en:'Inventory coverage by SKU (days)'},v:{es:'Granola y Barra en riesgo',en:'Granola and Protein Bar at risk'},
      bars:[9,13,28,35,44],lbls:['Granola','B.Prot.','M.Frutos','Mant.','B.Veg.']},
    alert:{es:'Dos referencias se agotan en menos de 15 días: Granola Premium (9 días) y Barra Proteica x12 (13 días). Producción tarda 18.',en:'Two SKUs run out within 15 days: Premium Granola (9 days) and Protein Bar x12 (13 days). Production takes 18.'},
    rank:{t:{es:'Referencias con menor cobertura',en:'SKUs with lowest coverage'},items:[
      {n:{es:'Granola Premium 500g',en:'Premium Granola 500g'},v:{es:'9 días',en:'9 days'},p:20},{n:{es:'Barra Proteica x12',en:'Protein Bar x12'},v:{es:'13 días',en:'13 days'},p:30},
      {n:{es:'Mix Frutos Secos',en:'Nut Mix'},v:{es:'28 días',en:'28 days'},p:64},{n:{es:'Mantequilla de maní',en:'Peanut Butter'},v:{es:'35 días',en:'35 days'},p:80}]} },
  { sub:{es:'Adquisición y retorno por canal digital',en:'Acquisition and return by digital channel'},
    kpis:[
      {l:{es:'CAC',en:'CAC'},v:'$38K',d:{es:'↑ 12%',en:'↑ 12%'},t:'err',c:''},
      {l:{es:'ROAS',en:'ROAS'},v:'3,1x',d:{es:'↓ vs 3.8x',en:'↓ vs 3.8x'},t:'warn',c:''},
      {l:{es:'Inversión mensual',en:'Monthly spend'},v:'$89M',d:{es:'',en:''},t:'',c:''},
      {l:{es:'Tráfico web',en:'Web traffic'},v:'↑ 14%',d:{es:'vs mes anterior',en:'vs last month'},t:'ok',c:'g'}],
    chart:{t:{es:'CAC por canal · mes actual',en:'CAC by channel · this month'},v:{es:'Meta es el más caro',en:'Meta is the priciest'},
      bars:[52,38,29,21],lbls:['Meta','Google','TikTok','Email']},
    alert:{es:'El CAC en Meta subió a $52K, el más caro de los 4 canales — ya representa el 61% de la inversión total en pauta.',en:'Meta CAC rose to $52K, the priciest of the 4 channels — already 61% of total ad spend.'},
    rank:{t:{es:'ROAS por canal',en:'ROAS by channel'},items:[
      {n:'Email',v:'6.8x',p:100},{n:'Google',v:'4.1x',p:60},
      {n:'TikTok',v:'3.2x',p:47},{n:'Meta',v:'2.1x',p:31}]} }
  ],
  kpis:[
    {l:{es:'Venta total mes',en:'Total monthly sales'},v:'$614M',d:{es:'↑ 18% vs anterior',en:'↑ 18% vs last month'},t:'ok',c:'g'},
    {l:{es:'Margen D2C',en:'D2C margin'},v:'46%',d:{es:'vs 22% en retail',en:'vs 22% in retail'},t:'ok',c:'c'},
    {l:{es:'CAC',en:'CAC'},v:'$38K',d:{es:'↑ 12% · Meta más caro',en:'↑ 12% · Meta got pricier'},t:'err',c:''},
    {l:{es:'Días de inventario',en:'Days of inventory'},v:'22',d:{es:'2 refs por agotarse',en:'2 SKUs about to stock out'},t:'warn',c:'e'}],
  chart:{t:{es:'Venta por canal · mes actual',en:'Sales by channel · current month'},v:{es:'D2C lidera en margen',en:'D2C leads on margin'},
    bars:[92,78,64,55,41,33,22],lbls:['D2C','Éxito','Carulla','Rappi',{es:'Nat.',en:'Health'},'CR','USA']},
  alert:{es:'<b>Éxito</b> tiene 11 días de inventario de tu referencia estrella. Si no despachas esta semana, pierdes el espacio en góndola.',en:'<b>Éxito</b> has 11 days of inventory of your hero SKU. Ship this week or you lose the shelf space.'},
  rank:{t:{es:'Top referencias por utilidad',en:'Top SKUs by profit'},items:[
    {n:{es:'Granola Premium 500g',en:'Premium Granola 500g'},v:'$48.2M',p:100},{n:{es:'Barra Proteica x12',en:'Protein Bar x12'},v:'$31.7M',p:66},
    {n:{es:'Mantequilla de maní',en:'Peanut Butter'},v:'$24.1M',p:50},{n:{es:'Mix Frutos Secos',en:'Nut Mix'},v:'$17.4M',p:36},
    {n:{es:'Bebida Vegetal 1L',en:'Plant Drink 1L'},v:'$9.9M',p:20}]},
  qa:[
    {q:{es:'¿Qué canal me deja más plata de verdad?',en:'Which channel actually makes me money?'},
     a:{es:'En volumen manda Éxito, pero en <b>utilidad</b> gana el D2C. Éxito vende <span class="num">$142M</span> y deja <span class="num">$31M</span> (22%); tu tienda propia vende <span class="num">$118M</span> y deja <span class="pos">$54M</span> (46%). Cada peso que muevas de retail a D2C vale más del doble — el freno es que el CAC ya va en $38K y subiendo.',
        en:'By volume Éxito wins, but on <b>profit</b> D2C wins. Éxito sells <span class="num">$142M</span> and leaves <span class="num">$31M</span> (22%); your own store sells <span class="num">$118M</span> and leaves <span class="pos">$54M</span> (46%). Every peso shifted from retail to D2C is worth more than double — the limit is CAC, now at $38K and rising.'}},
    {q:{es:'¿Voy a quedar en cero de algo?',en:'Am I about to stock out?'},
     a:{es:'Sí, <b>dos referencias</b> en menos de 15 días:<br>· Granola Premium 500g — <span class="neg">9 días</span> de cobertura<br>· Barra Proteica x12 — <span class="neg">13 días</span><br>Producción tarda 18 días. Sugerencia: prioriza Granola, que es el 31% de tu utilidad, y mueve stock de la bodega de Cali que tiene 40 días de sobra.',
        en:'Yes, <b>two SKUs</b> within 15 days:<br>· Premium Granola 500g — <span class="neg">9 days</span> of cover<br>· Protein Bar x12 — <span class="neg">13 days</span><br>Production takes 18 days. Suggestion: prioritize Granola, 31% of your profit, and pull stock from the Cali warehouse which has 40 days to spare.'}},
    {q:{es:'¿Cómo va la exportación?',en:'How is the export business doing?'},
     a:{es:'Costa Rica va bien: <span class="pos">+27%</span> trimestre a trimestre, margen del 38%, ya paga su propia operación. EE.UU. todavía no: <span class="num">$18M</span> de venta contra <span class="neg">$26M</span> de costo de entrada (registro, bodega, agente). Punto de equilibrio proyectado: <b>febrero de 2027</b> si sostienen el ritmo actual.',
        en:'Costa Rica is working: <span class="pos">+27%</span> quarter over quarter, 38% margin, already covers its own cost. The US is not there yet: <span class="num">$18M</span> in sales against <span class="neg">$26M</span> of entry cost (registration, warehousing, broker). Projected break-even: <b>February 2027</b> at the current pace.'}}]
},
{
  id:'hoteleria', ico:'🏨',
  name:{es:'Hotelería',en:'Hospitality'},
  co:'Hotel Casa Provenza',
  sector:{es:'Boutique · 64 habitaciones',en:'Boutique · 64 rooms'},
  src:{es:'PMS + Booking + Airbnb · sync hace 3 min',en:'PMS + Booking + Airbnb · synced 3 min ago'},
  title:{es:'Dashboard de Ocupación',en:'Occupancy Dashboard'},
  sub:{es:'El Poblado, Medellín · pronóstico a 30 días',en:'El Poblado, Medellín · 30-day forecast'},
  mods:[{i:'📊',n:{es:'Dashboard',en:'Dashboard'}},{i:'🛏️',n:{es:'Ocupación',en:'Occupancy'}},{i:'💵',n:{es:'Tarifas',en:'Rates'}},{i:'🌐',n:{es:'Canales',en:'Channels'}},{i:'🍽️',n:{es:'A&B',en:'F&B'}},{i:'✦',n:{es:'Agente IA',en:'AI Agent'}}],
  mv:[
  { sub:{es:'Ocupación por día y tipo de habitación',en:'Occupancy by day and room type'},
    kpis:[
      {l:{es:'Ocupación hoy',en:'Occupancy today'},v:'82%',d:{es:'↑ 6 pp vs sep 2025',en:'↑ 6 pp vs Sep 2025'},t:'ok',c:'c'},
      {l:{es:'Fin de semana',en:'Weekend'},v:'91%',d:{es:'',en:''},t:'ok',c:'g'},
      {l:{es:'Entre semana',en:'Weekdays'},v:'68%',d:{es:'',en:''},t:'warn',c:''},
      {l:{es:'No-shows',en:'No-shows'},v:'14%',d:{es:'de reservas sin garantía',en:'of unguaranteed bookings'},t:'err',c:'e'}],
    chart:{t:{es:'Ocupación por día de la semana',en:'Occupancy by day of week'},v:{es:'Jueves subvalorado',en:'Thursday underpriced'},
      bars:[58,58,65,71,89,88,91],lbls:['D','L','M','X','J','V','S']},
    alert:{es:'Los <b>jueves</b> promedian 89% de ocupación todo el mes — están subvalorados frente a su tarifa actual.',en:'<b>Thursdays</b> average 89% occupancy all month — clearly underpriced at the current rate.'},
    rank:{t:{es:'Ocupación por tipo de habitación',en:'Occupancy by room type'},items:[
      {n:{es:'Suite Jardín',en:'Garden Suite'},v:'94%',p:94},{n:{es:'Deluxe Vista',en:'Deluxe View'},v:'88%',p:88},
      {n:{es:'Estándar',en:'Standard'},v:'79%',p:79},{n:'301-306',v:'61%',p:61}]} },
  { sub:{es:'Oportunidad de precio por fecha',en:'Rate opportunity by date'},
    kpis:[
      {l:{es:'ADR',en:'ADR'},v:'$412K',d:{es:'↑ 8% vs anterior',en:'↑ 8% vs last month'},t:'ok',c:'g'},
      {l:{es:'RevPAR',en:'RevPAR'},v:'$338K',d:{es:'↑ 15% año a año',en:'↑ 15% YoY'},t:'ok',c:''},
      {l:{es:'ADR directo',en:'Direct ADR'},v:'$441K',d:{es:'vs $389K en OTAs',en:'vs $389K on OTAs'},t:'ok',c:'c'},
      {l:{es:'ADR canales OTA',en:'OTA channel ADR'},v:'$389K',d:{es:'',en:''},t:'warn',c:''}],
    chart:{t:{es:'ADR por segmento de fecha',en:'ADR by date segment'},v:{es:'Puentes muy por encima',en:'Long weekends far above'},
      bars:[350,380,412,480,620],lbls:[{es:'Baja',en:'Low'},{es:'Media',en:'Mid'},{es:'Alta',en:'High'},{es:'F.Semana',en:'Weekend'},{es:'Puente',en:'L.Weekend'}]},
    alert:{es:'El <b>puente del 12 de octubre</b> está al 97% y sigues vendiendo a tarifa de temporada baja. Subir 15% deja <b>$8.4M</b> extra sin perder ocupación.',en:'The <b>Oct 12 long weekend</b> is at 97% and you are still selling at low-season rates. A 15% increase adds <b>$8.4M</b> without losing occupancy.'},
    rank:{t:{es:'Oportunidad de ajuste de tarifa',en:'Rate adjustment opportunity'},items:[
      {n:{es:'Puente 12 oct',en:'Oct 12 weekend'},v:'+15%',p:100},{n:{es:'Jueves',en:'Thursdays'},v:'+8%',p:53},
      {n:{es:'Fin de semana',en:'Weekend'},v:'+4%',p:27},{n:{es:'Dom/Lun',en:'Sun/Mon'},v:'-5%',p:20}]} },
  { sub:{es:'Ingreso neto y costo por canal de venta',en:'Net revenue and cost by sales channel'},
    kpis:[
      {l:{es:'Comisión OTA total',en:'Total OTA commission'},v:'$47M',d:{es:'18% del ingreso',en:'18% of revenue'},t:'err',c:'e'},
      {l:{es:'% ingreso directo',en:'% direct revenue'},v:'41%',d:{es:'',en:''},t:'ok',c:'c'},
      {l:{es:'Booking.com',en:'Booking.com'},v:'30%',d:{es:'del ingreso',en:'of revenue'},t:'warn',c:''},
      {l:{es:'Comisión Expedia',en:'Expedia commission'},v:'20%',d:{es:'la más alta',en:'the highest'},t:'err',c:''}],
    chart:{t:{es:'Ingreso neto por canal',en:'Net revenue by channel'},v:{es:'Directo lidera sin comisión',en:'Direct leads with zero commission'},
      bars:[96,71,54,29,12],lbls:[{es:'Directo',en:'Direct'},'Booking',{es:'Corp.',en:'Corp.'},'Airbnb','Expedia']},
    alert:{es:'El canal directo tiene ADR más alto ($441K vs $389K) <i>y</i> cero comisión. Mover 10 puntos de Booking a directo vale cerca de $14M al mes.',en:'Direct has a higher ADR ($441K vs $389K) <i>and</i> zero commission. Shifting 10 points from Booking to direct is worth about $14M/month.'},
    rank:{t:{es:'Costo de comisión por canal',en:'Commission cost by channel'},items:[
      {n:'Expedia',v:'20%',p:100},{n:'Airbnb',v:'18%',p:90},
      {n:'Booking',v:'17%',p:85},{n:{es:'Corporativo',en:'Corporate'},v:'8%',p:40}]} },
  { sub:{es:'Ingreso y costo de alimentos y bebidas',en:'F&B revenue and cost'},
    kpis:[
      {l:{es:'Ingreso F&B mes',en:'Monthly F&B revenue'},v:'$62M',d:{es:'',en:''},t:'ok',c:'g'},
      {l:{es:'Costo desayuno real',en:'Real breakfast cost'},v:'$28K',d:{es:'por huésped',en:'per guest'},t:'err',c:''},
      {l:{es:'Precio en paquete',en:'Package price'},v:'$22K',d:{es:'por huésped',en:'per guest'},t:'warn',c:''},
      {l:{es:'Cubiertos servidos',en:'Covers served'},v:'2.140',d:{es:'este mes',en:'this month'},t:'ok',c:''}],
    chart:{t:{es:'Ingreso F&B por servicio',en:'F&B revenue by service'},v:{es:'Desayuno domina',en:'Breakfast dominates'},
      bars:[38,14,10],lbls:[{es:'Desayuno',en:'Breakfast'},{es:'Almuerzo',en:'Lunch'},{es:'Room service',en:'Room service'}]},
    alert:{es:'El desayuno cuesta $28K por huésped pero se cobra a $22K dentro del paquete — pierdes $6K por cada huésped que lo toma.',en:'Breakfast costs $28K per guest but is priced at $22K inside the package — you lose $6K per guest who takes it.'},
    rank:{t:{es:'Consumo F&B por outlet',en:'F&B revenue by outlet'},items:[
      {n:{es:'Restaurante principal',en:'Main restaurant'},v:'$38M',p:100},{n:{es:'Bar terraza',en:'Terrace bar'},v:'$14M',p:37},
      {n:{es:'Room service',en:'Room service'},v:'$10M',p:26}]} }
  ],
  kpis:[
    {l:{es:'Ocupación',en:'Occupancy'},v:'82%',d:{es:'↑ 6 pp vs sep 2025',en:'↑ 6 pp vs Sep 2025'},t:'ok',c:'c'},
    {l:{es:'ADR',en:'ADR'},v:'$412K',d:{es:'↑ 8% vs anterior',en:'↑ 8% vs last month'},t:'ok',c:'g'},
    {l:{es:'RevPAR',en:'RevPAR'},v:'$338K',d:{es:'↑ 15% año a año',en:'↑ 15% YoY'},t:'ok',c:''},
    {l:{es:'Comisión OTA',en:'OTA commission'},v:'$47M',d:{es:'18% del ingreso',en:'18% of revenue'},t:'err',c:'e'}],
  chart:{t:{es:'Ocupación proyectada · próximas 4 semanas',en:'Forecast occupancy · next 4 weeks'},v:{es:'Puente del 12 al pico',en:'Long weekend peaks'},
    bars:[71,78,66,84,97,88,74,69,82,91,63,58],lbls:['S1','','','S2','','','S3','','','S4','','']},
  alert:{es:'El <b>puente del 12 de octubre</b> está al 97% y sigues vendiendo a tarifa de temporada baja. Subir 15% deja <b>$8.4M</b> extra sin perder ocupación.',en:'The <b>Oct 12 long weekend</b> is at 97% and you are still selling at low-season rates. A 15% increase adds <b>$8.4M</b> without losing occupancy.'},
  rank:{t:{es:'Ingreso neto por canal',en:'Net revenue by channel'},items:[
    {n:{es:'Directo (web + tel.)',en:'Direct (web + phone)'},v:'$96M',p:100},{n:'Booking.com',v:'$71M',p:74},
    {n:{es:'Corporativo',en:'Corporate'},v:'$54M',p:56},{n:'Airbnb',v:'$29M',p:30},
    {n:'Expedia',v:'$12M',p:13}]},
  qa:[
    {q:{es:'¿Debería subir tarifa este mes?',en:'Should I raise rates this month?'},
     a:{es:'En dos ventanas concretas, sí. El <b>puente del 12</b> va en 97% de ocupación a 21 días — ahí puedes subir <span class="num">15%</span> sin riesgo (<span class="pos">+$8.4M</span>). Y los <b>jueves</b> promedian 89% todo el mes, están subvalorados. En cambio no toques domingos y lunes: van en 58% y subir ahí sí te cuesta noches.',
        en:'In two specific windows, yes. The <b>Oct 12 long weekend</b> is at 97% occupancy 21 days out — you can raise <span class="num">15%</span> risk-free (<span class="pos">+$8.4M</span>). And <b>Thursdays</b> average 89% all month, clearly underpriced. Do not touch Sundays and Mondays: they run at 58% and raising there costs you nights.'}},
    {q:{es:'¿Cuánto me cuestan las OTAs?',en:'How much are the OTAs costing me?'},
     a:{es:'<span class="neg">$47M</span> en comisiones este mes, el <b>18% del ingreso de habitación</b>. Booking se lleva $31M al 17%, Expedia $9M al 20%. Contraste útil: el canal directo tiene ADR más alto ($441K vs $389K) <i>y</i> cero comisión. Mover 10 puntos de Booking a directo vale cerca de <span class="pos">$14M al mes</span>.',
        en:'<span class="neg">$47M</span> in commissions this month, <b>18% of room revenue</b>. Booking takes $31M at 17%, Expedia $9M at 20%. Useful contrast: direct has a higher ADR ($441K vs $389K) <i>and</i> zero commission. Shifting 10 points from Booking to direct is worth about <span class="pos">$14M a month</span>.'}},
    {q:{es:'¿Qué me está costando plata sin que lo vea?',en:'What is quietly costing me money?'},
     a:{es:'Tres cosas. <b>1)</b> El <span class="neg">14% de no-shows</span> en reservas sin garantía — $11M al mes que no recuperas. <b>2)</b> Desayuno: costo real $28K por huésped, lo cobras a $22K dentro del paquete. <b>3)</b> Las habitaciones 301 a 306 tienen <span class="neg">2.1 estrellas menos</span> en reseñas por el ruido de la calle, y siguen vendiéndose a tarifa completa.',
        en:'Three things. <b>1)</b> A <span class="neg">14% no-show rate</span> on non-guaranteed bookings — $11M a month you never recover. <b>2)</b> Breakfast: real cost $28K per guest, priced at $22K inside the package. <b>3)</b> Rooms 301–306 score <span class="neg">2.1 stars lower</span> on reviews due to street noise, and still sell at full rate.'}}]
},
{
  id:'restaurantes', ico:'🍽️',
  name:{es:'Restaurantes',en:'Restaurants'},
  co:{es:'Grupo La Sazón',en:'La Sazón Group'},
  sector:{es:'4 sedes · cocina + delivery',en:'4 locations · dine-in + delivery'},
  src:{es:'POS + Rappi + Didi · sync hace 1 min',en:'POS + Rappi + Didi · synced 1 min ago'},
  title:{es:'Dashboard de Operación',en:'Operations Dashboard'},
  sub:{es:'4 sedes · corte del servicio de almuerzo',en:'4 locations · as of lunch service'},
  mods:[{i:'📊',n:{es:'Dashboard',en:'Dashboard'}},{i:'🍜',n:{es:'Menú',en:'Menu'}},{i:'🪑',n:{es:'Ocupación',en:'Covers'}},{i:'🛵',n:{es:'Delivery',en:'Delivery'}},{i:'🧾',n:{es:'Costos',en:'Costs'}},{i:'✦',n:{es:'Agente IA',en:'AI Agent'}}],
  mv:[
  { sub:{es:'Desempeño por plato · las 4 sedes',en:'Dish performance · all 4 locations'},
    kpis:[
      {l:{es:'Platos activos',en:'Active dishes'},v:'42',d:{es:'',en:''},t:'',c:''},
      {l:{es:'Plato estrella',en:'Star dish'},v:{es:'Bandeja',en:'Platter'},d:{es:'$18.4M/mes',en:'$18.4M/month'},t:'ok',c:'g'},
      {l:{es:'Plato en pérdida',en:'Losing dish'},v:{es:'Cazuela',en:'Casserole'},d:{es:'19% margen',en:'19% margin'},t:'err',c:'e'},
      {l:{es:'Ticket promedio',en:'Average ticket'},v:'$68K',d:{es:'↑ $4K vs anterior',en:'↑ $4K vs last month'},t:'ok',c:''}],
    chart:{t:{es:'Ventas por plato (top 8)',en:'Sales by dish (top 8)'},v:{es:'Bandeja de la casa lidera',en:'House Platter leads'},
      bars:[92,81,74,58,52,44,31,19],lbls:[{es:'Bandeja',en:'Platter'},{es:'Arroz',en:'Rice'},{es:'Pollo',en:'Chicken'},{es:'Ceviche',en:'Ceviche'},{es:'Sancocho',en:'Sancocho'},{es:'Pasta',en:'Pasta'},{es:'Lomo',en:'Tenderloin'},{es:'Cazuela',en:'Casserole'}]},
    alert:{es:'La <b>Cazuela de mariscos</b> es el plato más caro de producir ($41K de insumo) y deja apenas 19% de margen. Sacarla y empujar la Bandeja gana cerca de $3.8M/mes.',en:'The <b>Seafood Casserole</b> is the priciest to produce ($41K in inputs) and leaves only 19% margin. Dropping it for the Platter gains about $3.8M/month.'},
    rank:{t:{es:'Platos más pedidos (unidades/semana)',en:'Most ordered dishes (units/week)'},items:[
      {n:{es:'Bandeja de la casa',en:'House Platter'},v:'340',p:100},{n:{es:'Arroz de la huerta',en:'Garden Rice'},v:'298',p:88},
      {n:{es:'Pollo en salsa',en:'Chicken in Sauce'},v:'265',p:78},{n:{es:'Cazuela de mariscos',en:'Seafood Casserole'},v:'98',p:29}]} },
  { sub:{es:'Rotación de mesa por sede y franja',en:'Table turns by location and time slot'},
    kpis:[
      {l:{es:'Rotación mesa (almuerzo)',en:'Table turns (lunch)'},v:'2,4x',d:{es:'meta 3x',en:'target 3x'},t:'warn',c:'c'},
      {l:{es:'Cubiertos hoy',en:'Covers today'},v:'890',d:{es:'',en:''},t:'ok',c:''},
      {l:{es:'Tiempo promedio mesa',en:'Avg. table time'},v:'52 min',d:{es:'',en:''},t:'warn',c:''},
      {l:{es:'Ocupación pico',en:'Peak occupancy'},v:'96%',d:{es:'',en:''},t:'ok',c:'g'}],
    chart:{t:{es:'Cubiertos por franja horaria',en:'Covers by time slot'},v:{es:'Almuerzo domina',en:'Lunch dominates'},
      bars:[12,24,88,61,19,34,79,48],lbls:['9a','11a','1p','3p','5p','7p','9p','11p']},
    alert:{es:'La sede <b>Laureles</b> tiene rotación de mesa de 1.7x en almuerzo contra 2.9x en Envigado — mismo tamaño de salón, mitad del rendimiento.',en:'<b>Laureles</b> turns tables at 1.7x during lunch vs 2.9x in Envigado — same dining room size, half the throughput.'},
    rank:{t:{es:'Rotación de mesa por sede',en:'Table turns by location'},items:[
      {n:'Envigado',v:'2.9x',p:100},{n:{es:'Poblado',en:'Poblado'},v:'2.6x',p:90},
      {n:{es:'Sur',en:'South'},v:'2.1x',p:72},{n:'Laureles',v:'1.7x',p:59}]} },
  { sub:{es:'Venta y margen por plataforma de domicilios',en:'Delivery sales and margin by platform'},
    kpis:[
      {l:{es:'Venta delivery',en:'Delivery sales'},v:'$61M',d:{es:'25% de la venta',en:'25% of sales'},t:'ok',c:'g'},
      {l:{es:'Margen delivery',en:'Delivery margin'},v:'14%',d:{es:'vs 38% en salón',en:'vs 38% dine-in'},t:'err',c:'e'},
      {l:{es:'Comisión plataforma',en:'Platform commission'},v:'27%',d:{es:'',en:''},t:'warn',c:''},
      {l:{es:'Pedidos del mes',en:'Orders this month'},v:'2.180',d:{es:'',en:''},t:'ok',c:''}],
    chart:{t:{es:'Venta delivery por plataforma',en:'Delivery sales by platform'},v:{es:'Rappi domina el volumen',en:'Rappi dominates volume'},
      bars:[34,21,6],lbls:['Rappi','Didi Food','iFood']},
    alert:{es:'El delivery llena la franja muerta de 3 a 5 p.m., donde la cocina ya está pagada — pero deja solo 14% de margen tras comisión y empaque.',en:'Delivery fills the dead 3–5 p.m. window when the kitchen is already paid for — but leaves only 14% margin after commission and packaging.'},
    rank:{t:{es:'Platos más pedidos en delivery',en:'Most ordered dishes on delivery'},items:[
      {n:{es:'Bandeja de la casa',en:'House Platter'},v:'$14.2M',p:100},{n:{es:'Arroz de la huerta',en:'Garden Rice'},v:'$9.8M',p:69},
      {n:{es:'Pollo en salsa',en:'Chicken in Sauce'},v:'$7.1M',p:50},{n:{es:'Ceviche',en:'Ceviche'},v:'$4.4M',p:31}]} },
  { sub:{es:'Food cost y desperdicio por sede',en:'Food cost and waste by location'},
    kpis:[
      {l:{es:'Food cost',en:'Food cost'},v:'34,2%',d:{es:'meta 30%',en:'target 30%'},t:'err',c:'e'},
      {l:{es:'Desperdicio',en:'Waste'},v:'4,1%',d:{es:'registrado',en:'recorded'},t:'err',c:''},
      {l:{es:'Costo laboral',en:'Labor cost'},v:'28%',d:{es:'',en:''},t:'ok',c:''},
      {l:{es:'Sede con mayor food cost',en:'Highest food cost location'},v:{es:'Laureles',en:'Laureles'},d:{es:'41%',en:'41%'},t:'err',c:''}],
    chart:{t:{es:'Food cost por sede',en:'Food cost by location'},v:{es:'Laureles muy por encima',en:'Laureles far above'},
      bars:[31,33,30,41],lbls:['Envigado','Poblado','Sur','Laureles']},
    alert:{es:'El food cost subió 4.2 pp en 60 días. El 70% viene de dos platos que no se han repreciado desde marzo: Lomo al vino y Cazuela de mariscos.',en:'Food cost rose 4.2 pp in 60 days. 70% comes from two dishes unpriced since March: Wine Tenderloin and Seafood Casserole.'},
    rank:{t:{es:'Insumos con mayor alza de precio',en:'Inputs with the biggest price rise'},items:[
      {n:{es:'Mariscos',en:'Seafood'},v:'+22%',p:100},{n:{es:'Carnes rojas',en:'Red meat'},v:'+14%',p:64},
      {n:{es:'Lácteos',en:'Dairy'},v:'+9%',p:41},{n:{es:'Verduras',en:'Vegetables'},v:'+5%',p:23}]} }
  ],
  kpis:[
    {l:{es:'Venta del mes',en:'Monthly sales'},v:'$248M',d:{es:'↑ 6.8% vs agosto',en:'↑ 6.8% vs August'},t:'ok',c:'g'},
    {l:{es:'Food cost',en:'Food cost'},v:'34.2%',d:{es:'meta 30% · ↑ proteínas',en:'target 30% · protein up'},t:'err',c:'e'},
    {l:{es:'Ticket promedio',en:'Average ticket'},v:'$68K',d:{es:'↑ $4K vs anterior',en:'↑ $4K vs last month'},t:'ok',c:''},
    {l:{es:'Rotación de mesa',en:'Table turns'},v:'2.4x',d:{es:'almuerzo · meta 3x',en:'lunch · target 3x'},t:'warn',c:'c'}],
  chart:{t:{es:'Venta por franja horaria',en:'Sales by time slot'},v:{es:'El almuerzo manda',en:'Lunch dominates'},
    bars:[18,32,96,74,28,41,88,62],lbls:['9a','11a','1p','3p','5p','7p','9p','11p']},
  alert:{es:'El <b>food cost subió 4.2 pp</b> en 60 días. El 70% viene de dos platos: Lomo al vino y Cazuela de mariscos, que no se han repreciado desde marzo.',en:'<b>Food cost is up 4.2 pp</b> in 60 days. 70% comes from two dishes: Wine Tenderloin and Seafood Casserole, unpriced since March.'},
  rank:{t:{es:'Platos por margen de contribución',en:'Dishes by contribution margin'},items:[
    {n:{es:'Bandeja de la casa',en:'House Platter'},v:'71%',p:100},{n:{es:'Arroz de la huerta',en:'Garden Rice'},v:'66%',p:93},
    {n:{es:'Pollo en salsa',en:'Chicken in Sauce'},v:'58%',p:82},{n:{es:'Lomo al vino',en:'Wine Tenderloin'},v:'31%',p:44},
    {n:{es:'Cazuela de mariscos',en:'Seafood Casserole'},v:'19%',p:27}]},
  qa:[
    {q:{es:'¿Qué plato debería sacar del menú?',en:'Which dish should I drop?'},
     a:{es:'La <b>Cazuela de mariscos</b>. Es el plato más caro de producir (<span class="neg">$41K</span> de insumo), deja apenas <span class="neg">19%</span> de margen y solo se vende 14 veces por semana entre las 4 sedes. Ocupa un cocinero 22 minutos. Si la sacas y empujas la Bandeja de la casa en su lugar, ganas cerca de <span class="pos">$3.8M al mes</span>.',
        en:'The <b>Seafood Casserole</b>. It is the most expensive to produce (<span class="neg">$41K</span> in inputs), leaves only <span class="neg">19%</span> margin and sells just 14 times a week across all 4 locations. It ties up a cook for 22 minutes. Drop it, push the House Platter instead, and you gain roughly <span class="pos">$3.8M a month</span>.'}},
    {q:{es:'¿El delivery me sirve?',en:'Is delivery worth it?'},
     a:{es:'A medias. Aporta <span class="num">$61M</span> (25% de la venta) pero después de la comisión de plataforma (27%) y empaque, deja <span class="num">14%</span> de margen contra 38% en salón. Lo que sí vale: llena la franja muerta de 3 a 5 p.m., donde la cocina ya está pagada. Recomendación: mantenerlo, pero solo con los 8 platos de mayor margen.',
        en:'Partly. It adds <span class="num">$61M</span> (25% of sales) but after platform commission (27%) and packaging it leaves <span class="num">14%</span> margin vs 38% dine-in. What does work: it fills the dead 3–5 p.m. window when the kitchen is already paid for. Recommendation: keep it, but only for the 8 highest-margin dishes.'}},
    {q:{es:'¿Cuál sede está fallando?',en:'Which location is underperforming?'},
     a:{es:'La sede <b>Laureles</b>. Misma carta y tamaño que Envigado, pero <span class="neg">31% menos venta</span> y food cost 5 pp más alto. Dos señales: el desperdicio registrado dobla al de las otras sedes, y su rotación de mesa en almuerzo es 1.7x contra 2.9x. Es un problema de operación, no de ubicación.',
        en:'The <b>Laureles</b> location. Same menu and size as Envigado, but <span class="neg">31% lower sales</span> and food cost 5 pp higher. Two signals: recorded waste is double the other locations, and lunch table turns are 1.7x vs 2.9x. This is an operations problem, not a location problem.'}}]
},
{
  id:'salud', ico:'🩺',
  name:{es:'Salud',en:'Healthcare'},
  co:{es:'Clínica Santa Lucía',en:'Santa Lucía Clinic'},
  sector:{es:'IPS · 6 especialidades',en:'Clinic · 6 specialties'},
  src:{es:'HIS + facturación EPS · sync hace 8 min',en:'HIS + payer billing · synced 8 min ago'},
  title:{es:'Dashboard Asistencial y Financiero',en:'Clinical & Financial Dashboard'},
  sub:{es:'6 especialidades · 4 EPS contratadas',en:'6 specialties · 4 payer contracts'},
  mods:[{i:'📊',n:{es:'Dashboard',en:'Dashboard'}},{i:'🗓️',n:{es:'Agenda',en:'Scheduling'}},{i:'🧾',n:{es:'Facturación',en:'Billing'}},{i:'⚠️',n:{es:'Glosas',en:'Claim denials'}},{i:'👥',n:{es:'Talento',en:'Staff'}},{i:'✦',n:{es:'Agente IA',en:'AI Agent'}}],
  mv:[
  { sub:{es:'Ocupación e inasistencia por anticipación',en:'Fill rate and no-shows by lead time'},
    kpis:[
      {l:{es:'Ocupación de agenda',en:'Schedule fill rate'},v:'88%',d:{es:'↑ 3 pp',en:'↑ 3 pp'},t:'ok',c:'c'},
      {l:{es:'Inasistencia',en:'No-show rate'},v:'12,4%',d:{es:'≈$96M perdidos',en:'≈$96M lost'},t:'err',c:'e'},
      {l:{es:'Citas hoy',en:'Appointments today'},v:'214',d:{es:'',en:''},t:'ok',c:''},
      {l:{es:'Inasist. +21 días',en:'No-show 21+ days out'},v:'23%',d:{es:'vs 4% en <7 días',en:'vs 4% under 7 days'},t:'warn',c:''}],
    chart:{t:{es:'Inasistencia por anticipación de la cita',en:'No-shows by booking lead time'},v:{es:'Crece con la anticipación',en:'Rises with lead time'},
      bars:[4,9,15,23],lbls:['<7d','7-14d','15-21d','+21d']},
    alert:{es:'Un recordatorio por WhatsApp a 48 horas recuperaría cerca de la mitad de los $96M al mes que se pierden por inasistencia.',en:'A WhatsApp reminder at 48 hours would recover about half of the $96M/month lost to no-shows.'},
    rank:{t:{es:'Ocupación de agenda por especialidad',en:'Fill rate by specialty'},items:[
      {n:{es:'Ortopedia',en:'Orthopedics'},v:'96%',p:96},{n:{es:'Medicina interna',en:'Internal medicine'},v:'91%',p:91},
      {n:{es:'Ginecología',en:'Gynecology'},v:'87%',p:87},{n:{es:'Pediatría',en:'Pediatrics'},v:'82%',p:82}]} },
  { sub:{es:'Facturación y días de pago por EPS',en:'Billing and payment days by payer'},
    kpis:[
      {l:{es:'Facturación del mes',en:'Monthly billing'},v:'$1.240M',d:{es:'↑ 7% vs agosto',en:'↑ 7% vs August'},t:'ok',c:'g'},
      {l:{es:'Facturado a EPS A',en:'Billed to Payer A'},v:'$412M',d:{es:'',en:''},t:'ok',c:''},
      {l:{es:'Facturado a EPS C',en:'Billed to Payer C'},v:'$298M',d:{es:'',en:''},t:'ok',c:''},
      {l:{es:'Recaudo efectivo',en:'Cash collected'},v:'79%',d:{es:'de lo facturado',en:'of billed'},t:'warn',c:'c'}],
    chart:{t:{es:'Facturación por EPS',en:'Billing by payer'},v:{es:'EPS A concentra el mayor volumen',en:'Payer A holds the largest volume'},
      bars:[412,298,341,189],lbls:['EPS A','EPS B','EPS C','EPS D']},
    alert:{es:'La <b>EPS C</b> paga a 118 días en promedio, casi el doble que el resto — representa el 24% de la facturación mensual.',en:'<b>Payer C</b> pays at 118 days on average, almost double the rest — 24% of monthly billing.'},
    rank:{t:{es:'Días promedio de pago por EPS',en:'Average payment days by payer'},items:[
      {n:'EPS C',v:'118d',p:100},{n:'EPS A',v:'71d',p:60},
      {n:'EPS D',v:'58d',p:49},{n:'EPS B',v:'44d',p:37}]} },
  { sub:{es:'Glosas por causa y especialidad',en:'Denials by cause and specialty'},
    kpis:[
      {l:{es:'Glosas pendientes',en:'Open denials'},v:'$187M',d:{es:'15% de lo facturado',en:'15% of billed'},t:'err',c:'e'},
      {l:{es:'Por vencer en 9 días',en:'Due in 9 days'},v:'$47M',d:{es:'',en:''},t:'err',c:''},
      {l:{es:'Causa principal',en:'Main cause'},v:{es:'Soporte clínico',en:'Clinical support'},d:{es:'62%',en:'62%'},t:'warn',c:''},
      {l:{es:'Concentradas en',en:'Concentrated in'},v:{es:'3 profesionales',en:'3 practitioners'},d:{es:'',en:''},t:'err',c:''}],
    chart:{t:{es:'Glosas por causa',en:'Denials by cause'},v:{es:'Soporte clínico domina',en:'Clinical support dominates'},
      bars:[62,18,12,8],lbls:[{es:'Soporte clínico',en:'Clinical support'},{es:'Codificación',en:'Coding'},{es:'Pertinencia',en:'Pertinence'},{es:'Tarifas',en:'Rates'}]},
    alert:{es:'El 62% de las glosas del trimestre viene de una sola causa: soporte clínico incompleto en ortopedia — $116M concentrados en 3 profesionales.',en:'62% of this quarter\'s denials come from one cause: incomplete clinical support in orthopedics — $116M concentrated in 3 practitioners.'},
    rank:{t:{es:'Glosas por especialidad',en:'Denials by specialty'},items:[
      {n:{es:'Ortopedia',en:'Orthopedics'},v:'$116M',p:100},{n:{es:'Ginecología',en:'Gynecology'},v:'$34M',p:29},
      {n:{es:'Medicina interna',en:'Internal medicine'},v:'$22M',p:19},{n:{es:'Pediatría',en:'Pediatrics'},v:'$9M',p:8}]} },
  { sub:{es:'Productividad y riesgo por profesional',en:'Productivity and risk by practitioner'},
    kpis:[
      {l:{es:'Profesionales activos',en:'Active practitioners'},v:'34',d:{es:'',en:''},t:'',c:''},
      {l:{es:'Ocupación por profesional',en:'Fill rate per practitioner'},v:'82%',d:{es:'',en:''},t:'ok',c:'c'},
      {l:{es:'Concentran 62% de glosas',en:'Hold 62% of denials'},v:'3',d:{es:'profesionales',en:'practitioners'},t:'err',c:'e'},
      {l:{es:'Ausentismo del personal',en:'Staff absenteeism'},v:'3,1%',d:{es:'',en:''},t:'ok',c:''}],
    chart:{t:{es:'Consultas por profesional (promedio semanal)',en:'Consultations per practitioner (weekly avg)'},v:{es:'',en:''},
      bars:[62,58,54,49,44,38],lbls:['A','B','C','D','E','F']},
    alert:{es:'3 profesionales concentran el 62% de las glosas por soporte clínico incompleto — $116M en riesgo este trimestre.',en:'3 practitioners hold 62% of denials from incomplete clinical support — $116M at risk this quarter.'},
    rank:{t:{es:'Profesionales con mayor facturación',en:'Practitioners with highest billing'},items:[
      {n:{es:'Ortopedia · Dr. A',en:'Orthopedics · Dr. A'},v:'$214M',p:100},{n:{es:'Medicina interna · Dra. B',en:'Internal med. · Dr. B'},v:'$168M',p:78},
      {n:{es:'Ginecología · Dr. C',en:'Gynecology · Dr. C'},v:'$121M',p:57},{n:{es:'Pediatría · Dra. D',en:'Pediatrics · Dr. D'},v:'$74M',p:35}]} }
  ],
  kpis:[
    {l:{es:'Facturación del mes',en:'Monthly billing'},v:'$1.240M',d:{es:'↑ 7% vs agosto',en:'↑ 7% vs August'},t:'ok',c:'g'},
    {l:{es:'Glosas pendientes',en:'Open denials'},v:'$187M',d:{es:'15% de lo facturado',en:'15% of billed'},t:'err',c:'e'},
    {l:{es:'Ocupación de agenda',en:'Schedule fill rate'},v:'88%',d:{es:'↑ 3 pp',en:'↑ 3 pp'},t:'ok',c:'c'},
    {l:{es:'Inasistencia',en:'No-show rate'},v:'12.4%',d:{es:'≈$96M perdidos',en:'≈$96M lost'},t:'err',c:''}],
  chart:{t:{es:'Consultas atendidas por semana',en:'Consultations per week'},v:{es:'Últimas 8 semanas',en:'Last 8 weeks'},
    bars:[68,74,71,82,78,88,84,92],lbls:['S30','S31','S32','S33','S34','S35','S36','S37']},
  alert:{es:'<b>$47M en glosas</b> vencen el plazo de respuesta en 9 días. Si no se responden, se pierden definitivamente.',en:'<b>$47M in denials</b> hit their response deadline in 9 days. Unanswered, they are lost for good.'},
  rank:{t:{es:'Rentabilidad por especialidad',en:'Profitability by specialty'},items:[
    {n:{es:'Ortopedia',en:'Orthopedics'},v:'$214M',p:100},{n:{es:'Medicina interna',en:'Internal medicine'},v:'$168M',p:78},
    {n:{es:'Ginecología',en:'Gynecology'},v:'$121M',p:57},{n:{es:'Pediatría',en:'Pediatrics'},v:'$74M',p:35},
    {n:{es:'Dermatología',en:'Dermatology'},v:'$31M',p:15}]},
  qa:[
    {q:{es:'¿Por qué se nos están glosando tantas cuentas?',en:'Why are so many claims being denied?'},
     a:{es:'El <b>62% de las glosas</b> del trimestre viene de una sola causa: soporte clínico incompleto en procedimientos de ortopedia — falta la nota operatoria firmada. Son <span class="neg">$116M</span> concentrados en 3 profesionales. No es un problema de facturación, es de historia clínica: se puede cerrar con una validación obligatoria antes de radicar.',
        en:'<b>62% of this quarter\'s denials</b> come from a single cause: incomplete clinical support on orthopedic procedures — the signed operative note is missing. That is <span class="neg">$116M</span> concentrated in 3 practitioners. This is not a billing problem, it is a records problem: a mandatory check before submission closes it.'}},
    {q:{es:'¿Cuánto nos cuesta la inasistencia?',en:'What are no-shows costing us?'},
     a:{es:'<span class="neg">$96M al mes</span> en capacidad instalada que se paga igual. La inasistencia es del 12.4%, pero se concentra en las citas agendadas con <b>más de 21 días</b> de anticipación (23% de inasistencia) contra 4% en las de menos de 7 días. Un recordatorio por WhatsApp a 48 horas recuperaría cerca de la mitad.',
        en:'<span class="neg">$96M a month</span> in installed capacity you pay for anyway. The no-show rate is 12.4%, but it concentrates in appointments booked <b>more than 21 days</b> ahead (23% no-show) vs 4% for those under 7 days. A WhatsApp reminder at 48 hours would recover about half.'}},
    {q:{es:'¿Qué EPS nos paga peor?',en:'Which payer pays us worst?'},
     a:{es:'Por días de pago, la EPS C: <span class="neg">118 días</span> promedio contra 62 del resto. Pero la más costosa no es esa — es la EPS A, que paga a 71 días <i>y</i> glosa el <span class="neg">21%</span> de lo radicado. Entre las dos concentran el <b>74% de la cartera vencida</b> de la clínica.',
        en:'By payment days, Payer C: <span class="neg">118 days</span> on average vs 62 for the rest. But the costliest is not that one — it is Payer A, which pays at 71 days <i>and</i> denies <span class="neg">21%</span> of what is submitted. Together they hold <b>74% of the clinic\'s overdue receivables</b>.'}}]
},
{
  id:'construccion', ico:'🏗️',
  name:{es:'Construcción',en:'Construction'},
  co:'Constructora Espitia & Cía',
  sector:{es:'5 obras en paralelo',en:'5 concurrent projects'},
  src:{es:'ERP obra + nómina · sync hace 12 min',en:'Site ERP + payroll · synced 12 min ago'},
  title:{es:'Dashboard de Proyectos',en:'Projects Dashboard'},
  sub:{es:'Bogotá, Medellín y Barranquilla · presupuesto vs real',en:'Bogotá, Medellín & Barranquilla · budget vs actual'},
  mods:[{i:'📊',n:{es:'Dashboard',en:'Dashboard'}},{i:'🏗️',n:{es:'Obras',en:'Projects'}},{i:'💵',n:{es:'Presupuesto',en:'Budget'}},{i:'📦',n:{es:'Materiales',en:'Materials'}},{i:'👷',n:{es:'Nómina',en:'Payroll'}},{i:'✦',n:{es:'Agente IA',en:'AI Agent'}}],
  mv:[
  { sub:{es:'Avance físico vs programado por obra',en:'Physical vs planned progress by project'},
    kpis:[
      {l:{es:'Avance físico general',en:'Overall physical progress'},v:'61%',d:{es:'vs 66% programado',en:'vs 66% planned'},t:'warn',c:'c'},
      {l:{es:'Más atrasada',en:'Most behind'},v:{es:'Torre Aurora',en:'Torre Aurora'},d:{es:'-8 pts',en:'-8 pts'},t:'err',c:'e'},
      {l:{es:'Más avanzada',en:'Most advanced'},v:{es:'Reserva',en:'Reserva'},d:{es:'94%',en:'94%'},t:'ok',c:'g'},
      {l:{es:'Obras activas',en:'Active projects'},v:'5',d:{es:'',en:''},t:'',c:''}],
    chart:{t:{es:'Avance semanal acumulado · Torre Aurora',en:'Cumulative weekly progress · Torre Aurora'},v:{es:'Estancada desde S34',en:'Stalled since W34'},
      bars:[38,42,47,51,54,56,58],lbls:['S31','S32','S33','S34','S35','S36','S37']},
    alert:{es:'<b>Torre Aurora</b> lleva 8 puntos de atraso y ya consumió el 71% del presupuesto con 58% de avance. Proyección de sobrecosto: $340M.',en:'<b>Torre Aurora</b> is 8 points behind and has burned 71% of budget at 58% progress. Projected overrun: $340M.'},
    rank:{t:{es:'Avance vs programado por obra',en:'Progress vs plan by project'},items:[
      {n:{es:'Reserva',en:'Reserva'},v:'94%',p:94},{n:{es:'Mirador',en:'Mirador'},v:'81%',p:81},
      {n:{es:'Bosques',en:'Bosques'},v:'72%',p:72},{n:{es:'Aurora',en:'Aurora'},v:'58%',p:58}]} },
  { sub:{es:'Ejecución presupuestal por obra',en:'Budget execution by project'},
    kpis:[
      {l:{es:'Ejecutado del año',en:'Executed YTD'},v:'$8.400M',d:{es:'68% del presupuesto',en:'68% of budget'},t:'ok',c:'g'},
      {l:{es:'Desviación promedio',en:'Average overrun'},v:'+7,2%',d:{es:'sobre presupuesto',en:'over budget'},t:'err',c:'e'},
      {l:{es:'Sobrecosto Aurora',en:'Aurora overrun'},v:'$340M',d:{es:'proyectado',en:'projected'},t:'err',c:''},
      {l:{es:'Presupuesto disponible',en:'Budget remaining'},v:'$3.960M',d:{es:'',en:''},t:'ok',c:''}],
    chart:{t:{es:'Ejecución presupuestal por obra (%)',en:'Budget execution by project (%)'},v:{es:'Aurora y Reserva al límite',en:'Aurora and Reserva at the limit'},
      bars:[71,68,64,71,52],lbls:['Reserva','Mirador','Bosques','Aurora','Sendero']},
    alert:{es:'El sobrecosto de Aurora se concentra en acero de refuerzo (+$180M por el alza de julio) y mano de obra extra (+$97M en horas extra que no recuperaron el atraso).',en:'Aurora\'s overrun sits in rebar (+$180M from July\'s price rise) and extra labor (+$97M in overtime that did not close the delay).'},
    rank:{t:{es:'Sobrecosto proyectado por obra',en:'Projected overrun by project'},items:[
      {n:{es:'Torre Aurora',en:'Torre Aurora'},v:'$340M',p:100},{n:{es:'Bosques del Norte',en:'Bosques del Norte'},v:'$62M',p:18},
      {n:{es:'Sendero Verde',en:'Sendero Verde'},v:'$28M',p:8},{n:{es:'Edificio Mirador',en:'Mirador Building'},v:'$9M',p:3}]} },
  { sub:{es:'Consumo y alza de precio de materiales',en:'Material consumption and price rise'},
    kpis:[
      {l:{es:'Alza acero refuerzo',en:'Rebar price rise'},v:'+$180M',d:{es:'sobre lo cotizado',en:'over quoted price'},t:'err',c:'e'},
      {l:{es:'Cemento en stock',en:'Cement in stock'},v:'22 días',d:{es:'de cobertura',en:'coverage'},t:'ok',c:''},
      {l:{es:'OCs pendientes',en:'Open POs'},v:'6',d:{es:'',en:''},t:'warn',c:''},
      {l:{es:'Costo materiales del mes',en:'Monthly material cost'},v:'$2.100M',d:{es:'',en:''},t:'',c:''}],
    chart:{t:{es:'Alza de precio acero de refuerzo · 2026',en:'Rebar price rise · 2026'},v:{es:'$/tonelada',en:'$/ton'},
      bars:[2.1,2.2,2.4,2.9,3.1,3.3],lbls:[{es:'Ene',en:'Jan'},{es:'Feb',en:'Feb'},{es:'Mar',en:'Mar'},{es:'Abr',en:'Apr'},{es:'May',en:'May'},{es:'Jun',en:'Jun'}]},
    alert:{es:'El acero de refuerzo subió de $2.1M a $3.3M por tonelada desde enero — Torre Aurora se cotizó con el precio de enero y ya perdió $180M por esto.',en:'Rebar rose from $2.1M to $3.3M per ton since January — Torre Aurora was quoted at the January price and has already lost $180M from this.'},
    rank:{t:{es:'Consumo de acero por obra (toneladas)',en:'Rebar consumption by project (tons)'},items:[
      {n:{es:'Torre Aurora',en:'Torre Aurora'},v:'420t',p:100},{n:{es:'Bosques del Norte',en:'Bosques del Norte'},v:'310t',p:74},
      {n:{es:'Conjunto Reserva',en:'Reserva Complex'},v:'280t',p:67},{n:{es:'Edificio Mirador',en:'Mirador Building'},v:'190t',p:45}]} },
  { sub:{es:'Costo de nómina por obra y rendimiento',en:'Payroll cost by project and output'},
    kpis:[
      {l:{es:'Nómina de obra',en:'Site payroll'},v:'$412M',d:{es:'218 personas',en:'218 workers'},t:'',c:''},
      {l:{es:'Personas en obra',en:'Site workers'},v:'218',d:{es:'',en:''},t:'',c:''},
      {l:{es:'Horas extra Aurora',en:'Aurora overtime'},v:'$97M',d:{es:'sin recuperar atraso',en:'delay not recovered'},t:'err',c:'e'},
      {l:{es:'% nómina de Aurora',en:'% payroll on Aurora'},v:'29%',d:{es:'para 12% del avance',en:'for 12% of progress'},t:'err',c:''}],
    chart:{t:{es:'Nómina por obra',en:'Payroll by project'},v:{es:'Aurora concentra la mayor cuadrilla',en:'Aurora holds the largest crew'},
      bars:[118,94,81,71,48],lbls:['Aurora','Reserva','Bosques','Mirador','Sendero']},
    alert:{es:'Aurora tiene la cuadrilla más grande y el menor rendimiento por persona de las cinco obras: 29% de la nómina para el 12% del avance del mes.',en:'Aurora has the largest crew and the lowest output per person of the five projects: 29% of payroll for 12% of the month\'s progress.'},
    rank:{t:{es:'Costo de nómina por obra',en:'Payroll cost by project'},items:[
      {n:{es:'Torre Aurora',en:'Torre Aurora'},v:'$118M',p:100},{n:{es:'Conjunto Reserva',en:'Reserva Complex'},v:'$94M',p:80},
      {n:{es:'Bosques del Norte',en:'Bosques del Norte'},v:'$81M',p:69},{n:{es:'Edificio Mirador',en:'Mirador Building'},v:'$71M',p:60}]} }
  ],
  kpis:[
    {l:{es:'Ejecutado del año',en:'Executed YTD'},v:'$8.400M',d:{es:'68% del presupuesto',en:'68% of budget'},t:'ok',c:'g'},
    {l:{es:'Desviación promedio',en:'Average overrun'},v:'+7.2%',d:{es:'sobre presupuesto',en:'over budget'},t:'err',c:'e'},
    {l:{es:'Avance físico',en:'Physical progress'},v:'61%',d:{es:'vs 66% programado',en:'vs 66% planned'},t:'warn',c:'c'},
    {l:{es:'Nómina de obra',en:'Site payroll'},v:'$412M',d:{es:'218 personas',en:'218 workers'},t:'',c:''}],
  chart:{t:{es:'Avance por obra (%)',en:'Progress by project (%)'},v:{es:'Torre Aurora atrasada',en:'Torre Aurora is behind'},
    bars:[94,81,72,58,34],lbls:[{es:'Reserva',en:'Reserva'},{es:'Mirador',en:'Mirador'},{es:'Bosques',en:'Bosques'},{es:'Aurora',en:'Aurora'},{es:'Sendero',en:'Sendero'}]},
  alert:{es:'<b>Torre Aurora</b> lleva 8 puntos de atraso y ya consumió el 71% del presupuesto con 58% de avance. Proyección de sobrecosto: <b>$340M</b>.',en:'<b>Torre Aurora</b> is 8 points behind and has burned 71% of budget at 58% progress. Projected overrun: <b>$340M</b>.'},
  rank:{t:{es:'Margen proyectado por obra',en:'Projected margin by project'},items:[
    {n:{es:'Conjunto Reserva',en:'Reserva Complex'},v:'18.4%',p:100},{n:{es:'Edificio Mirador',en:'Mirador Building'},v:'14.1%',p:77},
    {n:{es:'Bosques del Norte',en:'Bosques del Norte'},v:'11.8%',p:64},{n:{es:'Sendero Verde',en:'Sendero Verde'},v:'9.2%',p:50},
    {n:{es:'Torre Aurora',en:'Torre Aurora'},v:'2.1%',p:11}]},
  qa:[
    {q:{es:'¿Qué obra se me está saliendo del presupuesto?',en:'Which project is blowing the budget?'},
     a:{es:'<b>Torre Aurora</b>, y con margen de sobra. Consumió el <span class="neg">71% del presupuesto</span> con solo 58% de avance físico. El sobrecosto se concentra en dos rubros: acero de refuerzo (<span class="neg">+$180M</span> por el alza de julio, cotizado en enero) y mano de obra extra (<span class="neg">+$97M</span> en horas extras para recuperar el atraso, que no las recuperó). Proyección de cierre: <span class="neg">$340M</span> por encima.',
        en:'<b>Torre Aurora</b>, by a wide margin. It has consumed <span class="neg">71% of budget</span> at only 58% physical progress. The overrun sits in two lines: rebar (<span class="neg">+$180M</span> from the July price increase, quoted in January) and extra labor (<span class="neg">+$97M</span> in overtime to catch up, which did not catch up). Projected close: <span class="neg">$340M</span> over.'}},
    {q:{es:'¿Cuánto me cuesta la nómina por obra?',en:'What is payroll per project?'},
     a:{es:'De $412M este mes: Aurora <span class="neg">$118M</span> (29% de la nómina para el 12% del avance del mes), Reserva $94M, Bosques $81M, Mirador $71M, Sendero $48M. La señal está clara: Aurora tiene la cuadrilla más grande y el menor rendimiento por persona de las cinco obras.',
        en:'Of $412M this month: Aurora <span class="neg">$118M</span> (29% of payroll for 12% of the month\'s progress), Reserva $94M, Bosques $81M, Mirador $71M, Sendero $48M. The signal is clear: Aurora has the largest crew and the lowest output per person of the five.'}},
    {q:{es:'¿Tengo con qué pagar el próximo trimestre?',en:'Can I cover next quarter?'},
     a:{es:'Ajustado. Tienes <span class="num">$1.840M</span> en caja y compromisos por <span class="num">$2.310M</span> a 90 días. Entran <span class="pos">$1.100M</span> de actas por radicar — pero dos actas de Bosques llevan 40 días sin aprobación del interventor. Si esas se destraban, cierras el trimestre con holgura; si no, hay un faltante de <span class="neg">$370M</span> en noviembre.',
        en:'Tight. You have <span class="num">$1,840M</span> in cash against <span class="num">$2,310M</span> of commitments over 90 days. <span class="pos">$1,100M</span> in progress billings are pending — but two Bosques certificates have sat 40 days awaiting supervisor approval. If those clear, the quarter closes comfortably; if not, there is a <span class="neg">$370M</span> shortfall in November.'}}]
},
{
  id:'servicios', ico:'⚙️',
  name:{es:'Servicios B2B',en:'B2B Services'},
  co:{es:'Vértice Consultores',en:'Vértice Consulting'},
  sector:{es:'Consultoría · 34 profesionales',en:'Consulting · 34 professionals'},
  src:{es:'CRM + timesheets · sync hace 5 min',en:'CRM + timesheets · synced 5 min ago'},
  title:{es:'Dashboard de Rentabilidad',en:'Profitability Dashboard'},
  sub:{es:'22 contratos activos · horas facturables',en:'22 active contracts · billable hours'},
  mods:[{i:'📊',n:{es:'Dashboard',en:'Dashboard'}},{i:'📁',n:{es:'Contratos',en:'Contracts'}},{i:'⏱️',n:{es:'Horas',en:'Hours'}},{i:'💰',n:{es:'Facturación',en:'Billing'}},{i:'👥',n:{es:'Equipo',en:'Team'}},{i:'✦',n:{es:'Agente IA',en:'AI Agent'}}],
  mv:[
  { sub:{es:'Consumo de horas por contrato',en:'Hours burned by contract'},
    kpis:[
      {l:{es:'Contratos activos',en:'Active contracts'},v:'22',d:{es:'',en:''},t:'',c:''},
      {l:{es:'Contratos en pérdida',en:'Contracts losing money'},v:'3',d:{es:'',en:''},t:'err',c:'e'},
      {l:{es:'Margen promedio',en:'Average margin'},v:'31%',d:{es:'↓ 4 pp',en:'↓ 4 pp'},t:'warn',c:'c'},
      {l:{es:'Mayor riesgo',en:'Highest risk'},v:{es:'Retail Colombia',en:'Retail Colombia'},d:{es:'-6%',en:'-6%'},t:'err',c:''}],
    chart:{t:{es:'Horas consumidas vs vendidas por contrato (%)',en:'Hours burned vs sold by contract (%)'},v:{es:'Tres contratos sobre el 90%',en:'Three contracts above 90%'},
      bars:[131,94,89,68],lbls:['Retail Col.','T.Uribe','L.Andina','A.Norte']},
    alert:{es:'Retail Colombia, Logística Andina y Textiles Uribe no tienen control de alcance formal — el equipo sigue atendiendo pedidos fuera de contrato.',en:'Retail Colombia, Logística Andina and Textiles Uribe have no formal scope control — the team keeps taking out-of-contract requests.'},
    rank:{t:{es:'Contratos por consumo de horas vendidas',en:'Contracts by % of sold hours burned'},items:[
      {n:{es:'Retail Colombia',en:'Retail Colombia'},v:'131%',p:100},{n:{es:'Textiles Uribe',en:'Textiles Uribe'},v:'94%',p:72},
      {n:{es:'Logística Andina',en:'Logística Andina'},v:'89%',p:68},{n:{es:'Alimentos del Norte',en:'Alimentos del Norte'},v:'68%',p:52}]} },
  { sub:{es:'Utilización del equipo por consultor',en:'Team utilization by consultant'},
    kpis:[
      {l:{es:'Tasa facturable',en:'Billable rate'},v:'64%',d:{es:'meta 72%',en:'target 72%'},t:'warn',c:'c'},
      {l:{es:'Horas facturables',en:'Billable hours'},v:'3.120',d:{es:'este mes',en:'this month'},t:'ok',c:''},
      {l:{es:'Horas no facturables',en:'Non-billable hours'},v:'1.780',d:{es:'',en:''},t:'err',c:''},
      {l:{es:'Sobreasignados',en:'Overallocated'},v:'2',d:{es:'+160% de asignación',en:'160%+ allocation'},t:'err',c:'e'}],
    chart:{t:{es:'Utilización por consultor',en:'Utilization by consultant'},v:{es:'Dos en rojo, tres subutilizados',en:'Two in the red, three underused'},
      bars:[187,163,78,71,64,45,38,29],lbls:['A.Restrepo','J.Mesa','C3','C4','C5','C6','C7','C8']},
    alert:{es:'Ana Restrepo (187%) y Julián Mesa (163%) están sobreasignados mientras 3 consultores están bajo 45% de facturación — rebalancear vale $52M/mes.',en:'Ana Restrepo (187%) and Julián Mesa (163%) are overallocated while 3 consultants sit below 45% utilization — rebalancing is worth $52M/month.'},
    rank:{t:{es:'Consultores con mayor sobreasignación',en:'Most overallocated consultants'},items:[
      {n:'Ana Restrepo',v:'187%',p:100},{n:'Julián Mesa',v:'163%',p:87},
      {n:{es:'Carlos Peña',en:'Carlos Peña'},v:'142%',p:76},{n:{es:'Daniela Ruiz',en:'Daniela Ruiz'},v:'128%',p:68}]} },
  { sub:{es:'Ingresos facturados y pipeline del trimestre',en:'Billed revenue and quarterly pipeline'},
    kpis:[
      {l:{es:'Ingresos del mes',en:'Monthly revenue'},v:'$486M',d:{es:'↑ 11% vs agosto',en:'↑ 11% vs August'},t:'ok',c:'g'},
      {l:{es:'Pipeline a 90 días',en:'90-day pipeline'},v:'$1.120M',d:{es:'cobertura 2.3x',en:'2.3x coverage'},t:'ok',c:''},
      {l:{es:'Meta trimestral',en:'Quarterly target'},v:'$1.500M',d:{es:'',en:''},t:'',c:''},
      {l:{es:'Proyección de cierre',en:'Projected close'},v:'$1.470M',d:{es:'-2% vs meta',en:'-2% vs target'},t:'warn',c:'c'}],
    chart:{t:{es:'Ingresos facturados por mes · trimestre',en:'Billed revenue by month · quarter'},v:{es:'',en:''},
      bars:[380,410,486],lbls:[{es:'Mes 1',en:'Month 1'},{es:'Mes 2',en:'Month 2'},{es:'Mes 3',en:'Month 3'}]},
    alert:{es:'Cerrar la propuesta de Alimentos del Norte ($180M, en decisión hace 12 días) pone al trimestre arriba de la meta por sí sola.',en:'Closing the Alimentos del Norte proposal ($180M, pending decision for 12 days) puts the quarter over target on its own.'},
    rank:{t:{es:'Pipeline por propuesta (90 días)',en:'Pipeline by proposal (90 days)'},items:[
      {n:{es:'Grupo Financiero Andino',en:'Grupo Financiero Andino'},v:'$410M',p:100},{n:{es:'Retail Sur Consultoría',en:'Retail Sur Consulting'},v:'$260M',p:63},
      {n:{es:'Alimentos del Norte',en:'Alimentos del Norte'},v:'$180M',p:44},{n:{es:'Otras 4 propuestas',en:'4 other proposals'},v:'$270M',p:66}]} },
  { sub:{es:'Carga y costo del equipo',en:'Team load and cost'},
    kpis:[
      {l:{es:'Consultores activos',en:'Active consultants'},v:'34',d:{es:'',en:''},t:'',c:''},
      {l:{es:'Sobreasignados',en:'Overallocated'},v:'4',d:{es:'+120%',en:'120%+'},t:'err',c:'e'},
      {l:{es:'Subutilizados',en:'Underutilized'},v:'3',d:{es:'-45%',en:'under 45%'},t:'warn',c:''},
      {l:{es:'Costo de equipo mes',en:'Monthly team cost'},v:'$298M',d:{es:'',en:''},t:'',c:''}],
    chart:{t:{es:'Distribución de asignación del equipo',en:'Team allocation distribution'},v:{es:'34 consultores, muestra de 10',en:'34 consultants, sample of 10'},
      bars:[187,163,142,128,78,71,64,45,38,29],lbls:['C1','C2','C3','C4','C5','C6','C7','C8','C9','C10']},
    alert:{es:'Rebalancear la carga entre los sobreasignados y los subutilizados recupera cerca de $52M/mes en horas facturables.',en:'Rebalancing load between the overallocated and the underutilized recovers about $52M/month in billable hours.'},
    rank:{t:{es:'Consultores subutilizados',en:'Underutilized consultants'},items:[
      {n:{es:'Consultor G',en:'Consultant G'},v:'38%',p:38},{n:{es:'Consultor H',en:'Consultant H'},v:'41%',p:41},
      {n:{es:'Consultor I',en:'Consultant I'},v:'44%',p:44}]} }
  ],
  kpis:[
    {l:{es:'Ingresos del mes',en:'Monthly revenue'},v:'$486M',d:{es:'↑ 11% vs agosto',en:'↑ 11% vs August'},t:'ok',c:'g'},
    {l:{es:'Tasa facturable',en:'Billable rate'},v:'64%',d:{es:'meta 72%',en:'target 72%'},t:'warn',c:'c'},
    {l:{es:'Margen por contrato',en:'Margin per contract'},v:'31%',d:{es:'↓ 4 pp · 3 en pérdida',en:'↓ 4 pp · 3 losing money'},t:'err',c:''},
    {l:{es:'Pipeline a 90 días',en:'90-day pipeline'},v:'$1.120M',d:{es:'cobertura 2.3x',en:'2.3x coverage'},t:'ok',c:''}],
  chart:{t:{es:'Horas facturables vs no facturables',en:'Billable vs non-billable hours'},v:{es:'Últimas 8 semanas',en:'Last 8 weeks'},
    bars:[58,64,61,70,66,59,72,68],lbls:['S30','S31','S32','S33','S34','S35','S36','S37']},
  alert:{es:'<b>3 contratos</b> ya superaron las horas vendidas y siguen recibiendo trabajo. Pérdida acumulada del mes: <b>$38M</b>.',en:'<b>3 contracts</b> have blown past their sold hours and keep receiving work. Month-to-date loss: <b>$38M</b>.'},
  rank:{t:{es:'Rentabilidad por cliente',en:'Profitability by client'},items:[
    {n:{es:'Grupo Bancolombia',en:'Grupo Bancolombia'},v:'48%',p:100},{n:{es:'Alimentos del Norte',en:'Alimentos del Norte'},v:'39%',p:81},
    {n:{es:'Textiles Uribe',en:'Textiles Uribe'},v:'27%',p:56},{n:{es:'Logística Andina',en:'Logística Andina'},v:'11%',p:23},
    {n:{es:'Retail Colombia',en:'Retail Colombia'},v:'-6%',p:5}]},
  qa:[
    {q:{es:'¿Qué contratos están perdiendo plata?',en:'Which contracts are losing money?'},
     a:{es:'<b>Tres</b>, y todos por lo mismo. Retail Colombia va en <span class="neg">-6%</span> (vendieron 320 horas, llevan 418), Logística Andina en 11% pero cayendo, y el proyecto de Textiles Uribe ya consumió el 94% de las horas con el 70% del alcance entregado. El patrón: ninguno tiene control de alcance formal, y el equipo sigue atendiendo pedidos fuera de contrato.',
        en:'<b>Three</b>, all for the same reason. Retail Colombia is at <span class="neg">-6%</span> (320 hours sold, 418 burned), Logística Andina at 11% and falling, and the Textiles Uribe project has consumed 94% of hours with 70% of scope delivered. The pattern: none has formal scope control, and the team keeps taking out-of-contract requests.'}},
    {q:{es:'¿Quién del equipo está sobrecargado?',en:'Who on the team is overloaded?'},
     a:{es:'Dos personas en rojo: <b>Ana Restrepo</b> con 187% de asignación (está en 5 proyectos a la vez) y <b>Julián Mesa</b> con 163%. Ambos son los senior que todos piden. Al mismo tiempo hay <span class="num">3 consultores</span> por debajo del 45% de facturación. Rebalancear vale cerca de <span class="pos">$52M al mes</span> en horas facturables recuperadas.',
        en:'Two people in the red: <b>Ana Restrepo</b> at 187% allocation (on 5 projects at once) and <b>Julián Mesa</b> at 163%. Both are the seniors everyone requests. Meanwhile <span class="num">3 consultants</span> sit below 45% utilization. Rebalancing is worth about <span class="pos">$52M a month</span> in recovered billable hours.'}},
    {q:{es:'¿Alcanzamos la meta del trimestre?',en:'Will we hit the quarterly target?'},
     a:{es:'Sí, pero con poco margen. Van en <span class="num">$1.290M</span> de una meta de $1.500M, faltando 5 semanas. Al ritmo actual cierran en <span class="num">$1.470M</span> — <span class="neg">2% por debajo</span>. Cerrar la propuesta de Alimentos del Norte ($180M, en decisión hace 12 días) los pone arriba de la meta por sí sola.',
        en:'Yes, but barely. You are at <span class="num">$1,290M</span> against a $1,500M target with 5 weeks left. At current pace you close at <span class="num">$1,470M</span> — <span class="neg">2% short</span>. Closing the Alimentos del Norte proposal ($180M, pending decision for 12 days) puts you over target on its own.'}}]
},
{
  id:'agro', ico:'🌱',
  name:{es:'Agroindustria',en:'Agribusiness'},
  co:'Agropecuaria La Esperanza',
  sector:{es:'4 predios · 620 hectáreas',en:'4 farms · 620 hectares'},
  src:{es:'Registro de campo + Siigo · sync hace 22 min',en:'Field records + Siigo · synced 22 min ago'},
  title:{es:'Dashboard de Cosecha y Costos',en:'Harvest & Cost Dashboard'},
  sub:{es:'Aguacate hass y cítricos · ciclo 2026',en:'Hass avocado & citrus · 2026 cycle'},
  mods:[{i:'📊',n:{es:'Dashboard',en:'Dashboard'}},{i:'🌾',n:{es:'Cosecha',en:'Harvest'}},{i:'💧',n:{es:'Insumos',en:'Inputs'}},{i:'🚢',n:{es:'Exportación',en:'Export'}},{i:'👷',n:{es:'Jornales',en:'Labor'}},{i:'✦',n:{es:'Agente IA',en:'AI Agent'}}],
  mv:[
  { sub:{es:'Rendimiento y calidad por predio',en:'Yield and quality by farm'},
    kpis:[
      {l:{es:'Producción del ciclo',en:'Cycle output'},v:'842 t',d:{es:'↑ 14% vs 2025',en:'↑ 14% vs 2025'},t:'ok',c:'c'},
      {l:{es:'Rendimiento/ha',en:'Yield/ha'},v:'1,36 t',d:{es:'',en:''},t:'ok',c:''},
      {l:{es:'Pico de cosecha',en:'Harvest peak'},v:{es:'Agosto',en:'August'},d:{es:'96 t',en:'96 t'},t:'ok',c:'g'},
      {l:{es:'Rechazo en empaque',en:'Packhouse rejects'},v:'11,2%',d:{es:'meta 7%',en:'target 7%'},t:'err',c:'e'}],
    chart:{t:{es:'Rendimiento por predio (t/ha)',en:'Yield by farm (t/ha)'},v:{es:'San José muy por debajo',en:'San José far below'},
      bars:[2.1,1.8,1.4,0.9],lbls:[{es:'La Esperanza',en:'La Esperanza'},{es:'El Retiro',en:'El Retiro'},{es:'Buenavista',en:'Buenavista'},{es:'San José',en:'San José'}]},
    alert:{es:'El rechazo en empaque subió a 11.2% y el 64% viene del predio San José. Cada punto de rechazo cuesta cerca de $37M al ciclo.',en:'Packhouse rejects rose to 11.2% and 64% comes from the San José farm. Each rejection point costs about $37M per cycle.'},
    rank:{t:{es:'Producción por predio (toneladas)',en:'Output by farm (tons)'},items:[
      {n:{es:'La Esperanza',en:'La Esperanza'},v:'378t',p:100},{n:{es:'El Retiro',en:'El Retiro'},v:'252t',p:67},
      {n:{es:'Buenavista',en:'Buenavista'},v:'156t',p:41},{n:{es:'San José',en:'San José'},v:'56t',p:15}]} },
  { sub:{es:'Composición y alza de costo por insumo',en:'Input cost composition and price rise'},
    kpis:[
      {l:{es:'Costo por tonelada',en:'Cost per ton'},v:'$2,9M',d:{es:'↑ 8% · fertilizantes',en:'↑ 8% · fertilizer'},t:'err',c:''},
      {l:{es:'Alza fertilizantes',en:'Fertilizer price rise'},v:'+31%',d:{es:'vs 2025',en:'vs 2025'},t:'err',c:'e'},
      {l:{es:'Riego y energía',en:'Irrigation & energy'},v:'9%',d:{es:'del costo',en:'of cost'},t:'ok',c:''},
      {l:{es:'Costo total del ciclo',en:'Total cycle cost'},v:'$2.442M',d:{es:'',en:''},t:'warn',c:'c'}],
    chart:{t:{es:'Composición del costo por tonelada',en:'Cost composition per ton'},v:{es:'Jornales y fertilizantes dominan',en:'Labor and fertilizer dominate'},
      bars:[41,29,14,9,7],lbls:[{es:'Jornales',en:'Labor'},{es:'Fertiliz.',en:'Fertilizer'},{es:'Empaque',en:'Packing'},{es:'Riego',en:'Irrigation'},{es:'Otros',en:'Other'}]},
    alert:{es:'Comprar el fertilizante del próximo ciclo antes de diciembre, según el histórico de precios, ahorraría cerca de $62M.',en:'Buying next cycle\'s fertilizer before December would save roughly $62M based on price history.'},
    rank:{t:{es:'Alza de insumos vs 2025',en:'Input price rise vs 2025'},items:[
      {n:{es:'Fertilizantes',en:'Fertilizer'},v:'+31%',p:100},{n:{es:'Empaque',en:'Packing'},v:'+12%',p:39},
      {n:{es:'Riego y energía',en:'Irrigation & energy'},v:'+6%',p:19},{n:{es:'Jornales',en:'Labor'},v:'+4%',p:13}]} },
  { sub:{es:'Margen por destino de venta',en:'Margin by sales destination'},
    kpis:[
      {l:{es:'% fruta exportada',en:'% fruit exported'},v:'68%',d:{es:'',en:''},t:'ok',c:'g'},
      {l:{es:'Precio exportación',en:'Export price'},v:'$4,4M/t',d:{es:'',en:''},t:'ok',c:''},
      {l:{es:'Precio local',en:'Local price'},v:'$2,6M/t',d:{es:'',en:''},t:'warn',c:''},
      {l:{es:'Margen neto export.',en:'Net export margin'},v:'$3,5M/t',d:{es:'',en:''},t:'ok',c:'c'}],
    chart:{t:{es:'Volumen exportado por destino',en:'Exported volume by destination'},v:{es:'EE.UU. concentra el volumen',en:'US holds the volume'},
      bars:[62,24,14],lbls:[{es:'EE.UU.',en:'US'},{es:'Europa',en:'Europe'},{es:'Medio Oriente',en:'Middle East'}]},
    alert:{es:'Solo el 68% de la fruta pasa calibre exportación. Bajar el rechazo de 11% a 7% valdría cerca de $148M al ciclo.',en:'Only 68% of the fruit makes export grade. Cutting rejects from 11% to 7% would be worth about $148M per cycle.'},
    rank:{t:{es:'Margen por destino de venta',en:'Margin by sales destination'},items:[
      {n:{es:'Exportación EE.UU.',en:'US export'},v:'$3,5M/t',p:100},{n:{es:'Exportación Europa',en:'Europe export'},v:'$3,2M/t',p:91},
      {n:{es:'Plaza local',en:'Local market'},v:'$2,6M/t',p:74}]} },
  { sub:{es:'Costo de jornal por predio',en:'Labor cost by farm'},
    kpis:[
      {l:{es:'Costo de jornales',en:'Labor cost'},v:'41%',d:{es:'del costo total',en:'of total cost'},t:'',c:''},
      {l:{es:'Jornaleros activos',en:'Active field workers'},v:'86',d:{es:'',en:''},t:'',c:''},
      {l:{es:'Jornal en San José',en:'San José day rate'},v:'+18%',d:{es:'vs otros predios',en:'vs other farms'},t:'err',c:'e'},
      {l:{es:'Jornales del ciclo',en:'Cycle labor cost'},v:'$1.001M',d:{es:'',en:''},t:'warn',c:'c'}],
    chart:{t:{es:'Costo de jornal por predio (miles COP/día)',en:'Day rate by farm (thousand COP/day)'},v:{es:'San José el más caro',en:'San José the priciest'},
      bars:[210,198,205,248],lbls:[{es:'La Esperanza',en:'La Esperanza'},{es:'El Retiro',en:'El Retiro'},{es:'Buenavista',en:'Buenavista'},{es:'San José',en:'San José'}]},
    alert:{es:'El jornal en San José cuesta 18% más que en los otros predios por la distancia a la cabecera municipal.',en:'San José\'s day rate costs 18% more than the other farms due to distance from town.'},
    rank:{t:{es:'Jornaleros por predio',en:'Field workers by farm'},items:[
      {n:{es:'La Esperanza',en:'La Esperanza'},v:'28',p:100},{n:{es:'Buenavista',en:'Buenavista'},v:'24',p:86},
      {n:{es:'El Retiro',en:'El Retiro'},v:'20',p:71},{n:{es:'San José',en:'San José'},v:'14',p:50}]} }
  ],
  kpis:[
    {l:{es:'Producción del ciclo',en:'Cycle output'},v:'842 t',d:{es:'↑ 14% vs 2025',en:'↑ 14% vs 2025'},t:'ok',c:'c'},
    {l:{es:'Costo por tonelada',en:'Cost per ton'},v:'$2.9M',d:{es:'↑ 8% · fertilizantes',en:'↑ 8% · fertilizer'},t:'err',c:''},
    {l:{es:'Precio promedio',en:'Average price'},v:'$4.4M',d:{es:'exportación 68%',en:'68% export'},t:'ok',c:'g'},
    {l:{es:'Rechazo en empaque',en:'Packhouse rejects'},v:'11.2%',d:{es:'meta 7%',en:'target 7%'},t:'err',c:'e'}],
  chart:{t:{es:'Toneladas cosechadas por mes',en:'Tons harvested per month'},v:{es:'Pico de cosecha en agosto',en:'Harvest peak in August'},
    bars:[22,31,48,67,84,96,78,54,38],lbls:['E','F','M','A','M','J','J','A','S']},
  alert:{es:'El <b>rechazo en empaque subió a 11.2%</b> y el 64% viene del predio San José. Cada punto de rechazo cuesta cerca de <b>$37M</b> al ciclo.',en:'<b>Packhouse rejects rose to 11.2%</b> and 64% comes from the San José farm. Each rejection point costs about <b>$37M</b> per cycle.'},
  rank:{t:{es:'Margen por predio',en:'Margin by farm'},items:[
    {n:{es:'La Esperanza (180 ha)',en:'La Esperanza (180 ha)'},v:'42%',p:100},{n:{es:'El Retiro (140 ha)',en:'El Retiro (140 ha)'},v:'36%',p:86},
    {n:{es:'Buenavista (160 ha)',en:'Buenavista (160 ha)'},v:'29%',p:69},{n:{es:'San José (140 ha)',en:'San José (140 ha)'},v:'12%',p:29}]},
  qa:[
    {q:{es:'¿Por qué San José rinde tan poco?',en:'Why does San José underperform?'},
     a:{es:'Tres razones que se suman. <b>1)</b> Rechazo en empaque del <span class="neg">19%</span> contra 7% de los otros predios — calibre irregular por riego deficiente en los lotes 4 y 7. <b>2)</b> Costo de jornal <span class="neg">18% más alto</span> por la distancia a la cabecera. <b>3)</b> Es el único predio sin registro digital de aplicaciones, así que el costo de insumos se estima, no se mide.',
        en:'Three compounding reasons. <b>1)</b> A <span class="neg">19%</span> packhouse rejection rate vs 7% at the other farms — irregular sizing from poor irrigation in plots 4 and 7. <b>2)</b> Labor cost <span class="neg">18% higher</span> due to distance from town. <b>3)</b> It is the only farm without digital application records, so input cost is estimated, not measured.'}},
    {q:{es:'¿Me conviene más exportar o vender local?',en:'Export or sell locally?'},
     a:{es:'Exportar, claramente. Precio de exportación <span class="pos">$4.4M/t</span> contra <span class="num">$2.6M/t</span> en plaza local, y aun descontando empaque, frío y flete quedan <span class="pos">$3.5M/t</span> netos. El límite no es el precio sino la calidad: solo el <b>68% de tu fruta</b> pasa calibre exportación. Bajar el rechazo de 11% a 7% valdría cerca de <span class="pos">$148M</span> al ciclo.',
        en:'Export, clearly. Export price <span class="pos">$4.4M/t</span> vs <span class="num">$2.6M/t</span> locally, and even after packing, cold chain and freight you net <span class="pos">$3.5M/t</span>. The limit is not price but quality: only <b>68% of your fruit</b> makes export grade. Cutting rejects from 11% to 7% would be worth about <span class="pos">$148M</span> per cycle.'}},
    {q:{es:'¿Cuánto me costó de verdad esta cosecha?',en:'What did this harvest really cost?'},
     a:{es:'<span class="num">$2.9M por tonelada</span>, repartidos así: jornales 41%, fertilizantes y agroquímicos 29%, empaque 14%, riego y energía 9%, otros 7%. Frente a 2025 subió <span class="neg">8%</span>, y casi todo el aumento está en fertilizantes (<span class="neg">+31%</span>). Si compras el fertilizante del próximo ciclo antes de diciembre, según el histórico de precios te ahorras cerca de <span class="pos">$62M</span>.',
        en:'<span class="num">$2.9M per ton</span>, broken down as: labor 41%, fertilizer and agrochemicals 29%, packing 14%, irrigation and energy 9%, other 7%. Versus 2025 it rose <span class="neg">8%</span>, and nearly all of it is fertilizer (<span class="neg">+31%</span>). Buying next cycle\'s fertilizer before December would save roughly <span class="pos">$62M</span> based on the price history.'}}]
}
];

/* ── 2. i18n ─────────────────────────────────────────────────────
   Spanish is the source of truth and is captured from the DOM on
   load, so it can never drift from the markup. Only English is
   authored here.                                                  */

const EN = {
  page_title:"Calybrat — AI business intelligence for companies",
  /* nav */
  n_demo:"Live demo", n_prod:"Product", n_cases:"Case studies", n_ind:"Industries",
  n_about:"About", n_cta_lk:"Contact",
  ab_lbl:"About us", ab_h2:"Built by people who have lived the problem",
  ab_sub:"We don't sell generic software adapted to Colombia — we built Calybrat from here, for the real Colombian business: payroll with severance, DIAN, 30/60/90 receivables. This is what the companies already using it every day have to say.",
  tab_studio:"Live demo", tab_problema:"The problem", tab_producto:"How it works",
  tab_modulos:"Modules", tab_casos:"Case studies", tab_industrias:"Industries",
  sn_problem:"The problem", sn_demo:"Demo & product", sn_contact:"Contact",
  dt_cta:"Open the interactive demo →", pt_from:"From", pt_cta:"See full pricing →",
  n_pri:"Pricing", n_mod:"Modules", n_cta:"Free assessment",
  /* hero */
  h_eye:"Business intelligence + AI agent · Colombia and LATAM",
  h_title:"Your whole company<br>on one screen.<br><em>And an analyst that never sleeps.</em>",
  h_sub:"We connect the data scattered across spreadsheets, your accounting software and WhatsApp — and turn it into a real-time dashboard. On top we add an AI agent trained on your operation: ask it a question in plain language and get an answer in seconds, backed by your actual numbers.",
  h_cta1:"Try the demo for your industry", h_cta2:"Book an assessment",
  h_meta:"Free assessment · Working dashboard in <b>48 hours</b> · No long contracts",
  tg1:"We optimize", tg2:"We automate", tg3:"We grow your business",
  cf_sync:"Synced with Siigo", cf_ai:"AI agent answering",
  k_sales:"Monthly sales", k_ar:"Overdue AR", k_ar_d:"3 clients", k_ar_d2:"3 clients · 30+ days",
  k_marg:"Gross margin", k_pay:"Monthly payroll", k_pay_d:"34 people",
  k_chart:"Sales per week", k_chart_v:"Last 7 weeks",
  k_alert:"Catalyst A12 at critical stock — <b>17% available</b>, six days of production left",
  k_today:"Sales today", k_today_d:"↑ 8% vs yesterday · as of 4:02 p.m.",
  t_lbl:"Dashboards we have built · manufacturing, consumer goods, hospitality, healthcare and more",
  /* studio */
  st_lbl:"Interactive demo",
  st_h2:"See what <span class=\"gold\">your</span> company would look like",
  st_sub:"Pick your industry and we build a sample dashboard live, with the modules, indicators and alerts that actually matter in that sector. Then ask the AI agent — exactly as you would with your own data.",
  st_pick:"<b>What industry are you in?</b> Tap one and the dashboard rebuilds itself.",
  st_free_ph:"Another industry? Type it here — e.g. logistics, jewelry, education",
  st_free_btn:"Generate",
  tag_live:"Real time", ai_name:"Calybrat Agent", ai_status:"Connected to your data", ai_try:"Try asking",
  st_note:"⚠ <b>Demo data</b> generated to illustrate the product. In your implementation every figure comes from your real sources.",
  /* problem */
  p_lbl:"The real problem",
  p_h2:"The data exists.<br>It just <span class=\"gold\">arrives too late</span>.",
  p_quote:"\"It is not right that in 2026 a manager has to wait until the 8th of the following month to find out how the previous month closed.\"",
  p1_t:"Spreadsheets that age on their own", p1_d:"Someone updates it on Mondays — if there is time. By Wednesday nobody knows whether the number is still real.",
  p2_t:"Data spread across five places", p2_d:"The accounting software, the warehouse sheet, the CRM, the WhatsApp group and the plant manager's head. None of them talk to each other.",
  p3_t:"Reports that arrive late", p3_d:"The close comes out on the 8th. By then you have already made three decisions on stale information.",
  p4_t:"A data analyst costs too much", p4_d:"A good BI hire runs several million pesos a month plus tooling. For most companies the math simply does not work.",
  p_after:"With Calybrat",
  ab_q1:"What was our best month this year and why?",
  ab_a1:"March, with <span class=\"num\">$487M</span> and a 24.1% margin. The driver was Almacenes La 14: <span class=\"pos\">+$62M</span> over February, almost all in the oils line. Worth noting: it was also the lowest-return month of the year (1.2%).",
  ab_q2:"And what should worry me this week?",
  ab_a2:"Two things. <b>1)</b> La Villa del Norte is <span class=\"neg\">62 days</span> late on $3.1M and is still buying on credit. <b>2)</b> Catalyst A12 is at 17% — at current consumption it runs out in <span class=\"neg\">6 days</span> and the supplier takes 9.",
  /* how it works */
  f_lbl:"How it works", f_h2:"Four layers between chaos and a decision",
  f_sub:"We do not sell you a licence and leave. We build the whole setup, adapted to how your company actually works — and we run it with you.",
  f1_t:"We connect", f1_d:"Siigo, Alegra, World Office, SIESA, Excel, Google Sheets, your POS or your ERP. If it holds data, we connect it — without replacing your current systems.",
  f2_t:"We centralize", f2_d:"We clean, cross-reference and unify everything into a single source of truth. Numbers stop contradicting each other between departments.",
  f3_t:"We visualize", f3_d:"Modules built for your sector: sales, receivables, inventory, production, payroll, occupancy — whatever your business needs to see.",
  f4_t:"We activate the agent", f4_d:"An AI agent with access to that unified base. It analyzes, cross-references and explains in plain language — like a senior analyst, available 24/7.",
  f_cost_t:"What used to require a data team",
  f_cost_d:"A BI analyst in Colombia costs between $6M and $12M a month, plus licences, plus someone's time to manage them. Calybrat delivers the same analytical capability — live dashboards and business answers on demand — for a fraction, and running from the first week.",
  f_cost_a:"$8M+ / month", f_cost_b:"from, per month",
  /* modules */
  m_lbl:"Modules", m_h2:"One platform. The modules your operation needs.",
  m_sub:"We assemble the dashboard from the pieces that apply to your business — and build the ones that do not exist yet. These are the most requested.",
  mo1_t:"Executive Dashboard", mo1_d:"The whole business on one screen. What matters, in 30 seconds, before the meeting.",
  mo2_t:"Sales & Orders", mo2_d:"Billing by day, channel and rep. Top clients, star products, trend and target.",
  mo3_t:"Receivables & Collections", mo3_d:"Who owes, how much and for how long. Automatic alerts before late turns into lost.",
  mo4_t:"Inventory & Warehouses", mo4_d:"Stock by warehouse, critical minimums, turnover and stockout forecasting with days of cover.",
  mo5_t:"Production & Projects", mo5_d:"Work order progress, bottlenecks, real cost per batch and on-time delivery.",
  mo6_t:"Payroll & People", mo6_d:"True labor cost with benefits, load by area, turnover and pending vacation.",
  mo7_t:"Logistics & Dispatch", mo7_d:"On-time delivery, cost per route, returns and carrier performance.",
  mo8_t:"Finance & Tax", mo8_d:"Projected cash flow, P&amp;L by line, tax calendar, VAT and withholdings without surprises.",
  mo9_t:"AI Agent", mo9_d:"The module that changes everything. Ask in plain language, cross departments, spot patterns — and get told what to do, not just what happened.",
  mt_rt:"Real time", mt_chan:"By channel", mt_goal:"Target vs actual", mt_alert:"Alerts", mt_aging:"Aging",
  mt_multi:"Multi-warehouse", mt_rot:"Turnover", mt_cost:"Real cost", mt_prest:"Benefits", mt_area:"By area",
  mt_otif:"OTIF", mt_route:"By route", mt_cash:"Cash flow", mt_nl:"Natural language", mt_prop:"Proactive",
  /* cases */
  c_lbl:"What we have built", c_h2:"Real dashboards, for real operations",
  c_sub:"Every implementation starts by understanding how the business actually works inside. These are some of the systems we have designed and put into production.",
  c1_s:"Consumer goods · D2C + retail",
  c1_d:"A food brand selling through its own e-commerce, Éxito, Carulla, Rappi, health stores and exports to Costa Rica and the US. Every channel had its own version of the truth.",
  c1_o:"A single view of <b>sell-in vs sell-out</b> across 7 channels and 3 countries, with per-channel pricing and true profitability by SKU.",
  c2_s:"Packaging · Business group",
  c2_d:"30 years of operation, over 2,000 items, 6 branches and three companies in the same group that had never been seen consolidated on one board.",
  c2_o:"Unified <b>multi-warehouse</b> inventory and receivables, plus a consolidated real-time view of all three group companies.",
  c3_n:"El Poblado Hotels", c3_s:"Hospitality · Medellín",
  c3_d:"A hotel operation where the rate decision was made using yesterday's occupancy and a spreadsheet updated by hand.",
  c3_o:"Occupancy, <b>ADR and RevPAR</b> by day and by channel, with OTA commission cost visible before setting the rate.",
  c4_s:"FRP manufacturing · Fiberglass",
  c4_d:"Project-based manufacturing: every order is different, with its own materials, labor and margin. Real cost was only known at closing.",
  c4_o:"Cost per work order <b>during</b> production — not a month later — with raw material alerts and a tax calendar.",
  c5_s:"Food distribution",
  c5_d:"A distributor with its own fleet, daily routes and hundreds of store-to-store clients. Route profitability was a hunch, not a number.",
  c5_o:"Profitability <b>by route and by rep</b>, with returns and receivables cross-referenced against the margin of every delivery.",
  c6_s:"Restaurant · Netherlands",
  c6_d:"Our first dashboard outside LATAM, entirely in Dutch. Same logic, different language and different service metrics.",
  c6_o:"Margin <b>per dish and per shift</b>, with input costs, online reputation and reservations in a single view.",
  cm_sellout:"Sell-out by channel", cm_exp:"Expansion", cm_group:"Group consolidation", cm_auth:"Login access",
  cm_chan:"OTA channels", cm_qual:"Quality", cm_exp2:"Exports", cm_fleet:"Fleet & routes", cm_ret:"Returns", cm_menu:"Menu engineering",
  /* industries */
  i_lbl:"Industries", i_h2:"Every sector has its own logic",
  i_sub:"A hotel does not measure what a factory measures. That is why we do not sell templates: we adapt the modules and the agent to the indicators that actually move your industry. Tap any one to see it in the demo.",
  /* metrics */
  me1_s:"From assessment to dashboard", me1_d:"running on real data",
  me2_s:"Modules available", me2_d:"plus whatever we build for you",
  me3_s:"Industries implemented", me3_d:"from manufacturing to hospitality",
  me4_s:"The agent never rests", me4_d:"answers at any hour",
  /* testimonials */
  te_lbl:"Testimonials", te_h2:"What changes when the data arrives on time",
  tq1:"Mondays used to be chaos: a meeting with sales, one with the warehouse, one with the accountant — and we still walked out unclear on how the week closed. Now I open the dashboard and in 30 seconds I know what happened, which clients to call and which product has gone quiet. The meeting went from two hours to twenty minutes.",
  th1:"💡 <b>$8.4M in overdue receivables</b> nobody was chasing — found in the first week.",
  tr1:"General Manager · Distribution",
  tq2:"What surprised me most was the agent. I asked which SKU gave us the best margin and it came back with the full analysis in seconds, cross-referencing sales against production costs. That used to be two days of the accountant and the warehouse lead sitting together building a spreadsheet.",
  th2:"💡 We found that <b>18% of volume generated 41% of profit</b>.",
  tr2:"Operations Director · Manufacturing",
  /* pledge */
  g_lbl:"How we work", g_h2:"Your guide, not your software vendor",
  g_p1:"We know what it feels like to manage without real data: the close arrives late, the report you asked for is already stale, and you still have to decide. That is not a lack of effort — it is a lack of the right tools.",
  g_p2:"That is why we built Calybrat: so a mid-sized company can have the same level of business intelligence that only large corporations used to afford.",
  cr1:"to get your dashboard live", cr2:"cost of the assessment", cr3:"agent availability",
  gp1_t:"We start with a pilot", gp1_d:"We do not ask you to trust us before seeing results. Real data, a concrete deliverable, before any long commitment.",
  gp2_t:"No technical lock-in", gp2_d:"We do not build something only we understand. Your team gets the tool and the judgment to use it without us beside them.",
  gp3_t:"Your data stays yours", gp3_d:"Access controlled per user, nothing shared with third parties, and you can export your information whenever you want.",
  gp4_t:"Built for the local context", gp4_d:"Payroll with statutory benefits, tax authority calendars, withholdings, 30/60/90 receivables. We do not adapt foreign software — we build it for here.",
  /* pricing */
  pc_lbl:"Pricing", pc_h2:"No surprises. No long contracts.",
  pc_sub:"Pay month to month, cancel whenever. The initial assessment is always free — whether or not you go ahead with us.",
  pc_mo:" COP/month",
  pl1_d:"To start with the essential modules and see value quickly.",
  pl1_f1:"Up to 3 modules of your choice", pl1_f2:"2 users", pl1_f3:"Executive dashboard included", pl1_f4:"WhatsApp support",
  pl_ai:"AI Agent", pl_ai2:"AI Agent included", pl_int:"Automatic accounting integration",
  pl2_d:"The full experience: every module and the AI agent connected.",
  pl2_f1:"All modules", pl2_f2:"Up to 5 users", pl2_f5:"Automatic WhatsApp alerts", pl2_f6:"Priority support",
  pl3_amt:"Custom", pl3_d:"For business groups or specific integration and scale needs.",
  pl3_f1:"Unlimited users", pl3_f2:"Custom modules", pl3_f3:"Multi-company consolidation",
  pl3_f4:"ERP / IoT integrations", pl3_f5:"Dedicated implementation and SLA", pl3_f6:"24/7 support",
  pl_pop:"Most popular", pl_start:"Get started", pl_talk:"Let's talk",
  /* cta */
  cta_h:"With data in real time,<br><span class=\"gold\">Mondays change.</span>",
  cta_s:"You open the dashboard before the meeting and you already know how the week closed, which client to call today and which SKU is losing margin. You call nobody. You wait for nobody. You decide.",
  cta_b1:"Book a free assessment", cta_n:"We reply within 4 business hours · Free · No commitment",
  /* contact */
  co_lbl:"Contact", co_h2:"Tell us how your company works",
  co_sub:"A one-hour call is enough for us to tell you what can be automated, what you should be measuring and what your dashboard would look like. Free and with no commitment.",
  ch_mail:"Email",
  f_name:"Name", f_co:"Company", f_email:"Email", f_wa:"WhatsApp",
  f_sec:"What sector are you in?", f_msg:"What would you like to see, or decide better?",
  f_ph_name:"Your name", f_ph_co:"Your company name",
  f_ph_msg:"E.g. I want to know every day how much we sold by channel and which clients are overdue, without asking anyone for the report.",
  f_send:"Send message", f_note:"We reply within 4 business hours",
  f_ok:"✓ Message sent! We will contact you very soon.",
  /* footer */
  ft_tag:"AI business intelligence for companies that want to stop deciding blind.",
  ft_prod:"Product", ft_comp:"Company", ft_cont:"Contact",
  ft_how:"How it works", ft_test:"Testimonials", ft_diag:"Free assessment"
};

const ES = {};            /* filled from the DOM on first load */
let lang = 'es';

function captureES(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{ ES[el.dataset.i18n] = el.textContent; });
  document.querySelectorAll('[data-i18nHtml],[data-i18n-html]').forEach(el=>{ ES[el.dataset.i18nHtml] = el.innerHTML; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{ ES[el.dataset.i18nPlaceholder] = el.placeholder; });
  ES.page_title = document.title;
}

function applyLang(l){
  lang = l;
  const D = l === 'es' ? ES : EN;
  document.documentElement.lang = l;
  if (D.page_title) document.title = D.page_title;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const v = D[el.dataset.i18n]; if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{
    const v = D[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const v = D[el.dataset.i18nPlaceholder]; if (v !== undefined) el.placeholder = v;
  });
  document.querySelectorAll('.lang').forEach(b=>{
    b.textContent = l === 'es' ? 'EN' : 'ES';
    b.setAttribute('aria-label', l === 'es' ? 'Switch to English' : 'Cambiar a español');
  });
  buildMarquee(); buildChips(); buildIndCards(); buildSectorSelect();
  if (document.getElementById('studioFrame')) renderIndustry(currentInd, true, currentModIx);
}
function toggleLang(){ applyLang(lang === 'es' ? 'en' : 'es'); }

/* pick the right string from an {es,en} pair (or a plain string) */
const L = v => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] || v.es) : v;

/* short blurbs for the Industries section cards */
const DESC = {
  manufactura:{es:'Órdenes de producción, costo real por lote, materias primas, OEE por planta y exportaciones.',en:'Work orders, real cost per batch, raw materials, OEE by plant and exports.'},
  distribucion:{es:'Rentabilidad por ruta y vendedor, cartera tienda a tienda, devoluciones y cumplimiento de entrega.',en:'Profitability by route and rep, store-level receivables, returns and delivery compliance.'},
  retail:{es:'Sell-in vs sell-out por canal, margen real por referencia, días de inventario y CAC.',en:'Sell-in vs sell-out by channel, true margin per SKU, days of inventory and CAC.'},
  hoteleria:{es:'Ocupación, ADR y RevPAR por día y canal, costo de comisión OTA y pronóstico de demanda.',en:'Occupancy, ADR and RevPAR by day and channel, OTA commission cost and demand forecasting.'},
  restaurantes:{es:'Food cost por plato, margen de contribución, rotación de mesa, delivery y desperdicio.',en:'Food cost per dish, contribution margin, table turns, delivery and waste.'},
  salud:{es:'Facturación por EPS, glosas y causa raíz, ocupación de agenda, inasistencia y costo por especialidad.',en:'Billing by payer, denials and root cause, schedule fill rate, no-shows and cost per specialty.'},
  construccion:{es:'Presupuesto vs real por obra, avance físico, nómina por proyecto y flujo de caja proyectado.',en:'Budget vs actual by project, physical progress, payroll per project and projected cash flow.'},
  servicios:{es:'Horas facturables, rentabilidad por contrato y cliente, carga del equipo y pipeline.',en:'Billable hours, profitability by contract and client, team load and pipeline.'},
  agro:{es:'Producción por predio, costo real por tonelada, calidad de empaque, jornales y exportación.',en:'Output per farm, real cost per ton, pack quality, labor and exports.'}
};

/* free-text industry matching */
const KEYS = {
  manufactura:['manufactur','fabric','industria','planta','metal','plastic','textil','quimic','ensambl','maquil','produccion','factory','plant','chemical'],
  distribucion:['distribu','mayorist','wholesal','abarrot','ferreter','reparto','tienda a tienda','deliver','logistic','logística','transport','courier','carga','flota'],
  retail:['retail','tienda','comercio','ecommerce','e-commerce','marca','consumo','supermerc','moda','ropa','calzado','joyer','cosmet','belleza','shop','store','brand'],
  hoteleria:['hotel','hosped','turism','hostal','resort','alojamiento','airbnb','finca','glamping','tourism','lodging'],
  restaurantes:['restaurant','gastro','comida','cafeter','bar','panader','food','cocina','catering','pizzer','café','coffee','heladeria'],
  salud:['salud','clinic','clínic','hospital','medic','odontolog','laboratorio','ips','eps','veterinar','farmac','health','dental','estetic'],
  construccion:['construc','obra','inmobiliar','ingenier','arquitect','vivienda','edific','constru','contractor','infraestructur','real estate'],
  servicios:['servicio','consultor','agencia','software','tecnolog','abogad','juridic','contable','contador','marketing','educac','colegio','universidad','academ','seguros','financier','banco','fintech','saas','consulting','agency','legal','school'],
  agro:['agro','agric','cultivo','finca','ganader','cafe','café','flores','banano','aguacate','palma','pesca','acuicultura','farm','crop','livestock']
};

function matchIndustry(txt){
  const t = txt.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  for (const [id, words] of Object.entries(KEYS))
    for (const w of words)
      if (t.includes(w.normalize('NFD').replace(/[̀-ͯ]/g,''))) return id;
  return null;
}

/* generic dashboard for an industry we do not have canned data for */
function genericFor(nameRaw){
  const name = nameRaw.trim().replace(/\s+/g,' ').slice(0,42);
  const Cap = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id:'__custom', ico:'✦', custom:true,
    name:{es:Cap,en:Cap},
    co:{es:'Empresa de '+name,en:name+' company'},
    sector:{es:'Panel generado a tu medida',en:'Dashboard generated for you'},
    src:{es:'Fuentes conectadas · sync hace 3 min',en:'Connected sources · synced 3 min ago'},
    title:{es:'Dashboard Ejecutivo',en:'Executive Dashboard'},
    sub:{es:'Vista de ejemplo para '+name+' · corte de hoy',en:'Sample view for '+name+' · as of today'},
    mods:[{i:'📊',n:{es:'Dashboard',en:'Dashboard'}},{i:'💰',n:{es:'Ingresos',en:'Revenue'}},{i:'🧾',n:{es:'Costos',en:'Costs'}},{i:'📋',n:{es:'Cartera',en:'Receivables'}},{i:'👥',n:{es:'Equipo',en:'Team'}},{i:'✦',n:{es:'Agente IA',en:'AI Agent'}}],
    kpis:[
      {l:{es:'Ingresos del mes',en:'Monthly revenue'},v:'$364M',d:{es:'↑ 10.1% vs anterior',en:'↑ 10.1% vs last month'},t:'ok',c:'g'},
      {l:{es:'Margen operativo',en:'Operating margin'},v:'19.8%',d:{es:'↑ 0.8 pp',en:'↑ 0.8 pp'},t:'ok',c:''},
      {l:{es:'Cartera vencida',en:'Overdue AR'},v:'$14M',d:{es:'4 clientes · +30 días',en:'4 clients · 30+ days'},t:'err',c:'e'},
      {l:{es:'Costo de operación',en:'Operating cost'},v:'$292M',d:{es:'80% del ingreso',en:'80% of revenue'},t:'warn',c:'c'}],
    chart:{t:{es:'Ingresos por semana',en:'Revenue per week'},v:{es:'Últimas 8 semanas',en:'Last 8 weeks'},
      bars:[54,68,61,79,72,85,77,91],lbls:['S30','S31','S32','S33','S34','S35','S36','S37']},
    alert:{es:'<b>4 clientes</b> concentran el 61% de tu ingreso. Si el mayor se va, pierdes <b>$81M al mes</b> — vale la pena diversificar.',
           en:'<b>4 clients</b> account for 61% of your revenue. If the largest leaves you lose <b>$81M a month</b> — worth diversifying.'},
    rank:{t:{es:'Principales fuentes de ingreso',en:'Top revenue sources'},items:[
      {n:{es:'Línea principal',en:'Core line'},v:'$118M',p:100},{n:{es:'Segunda línea',en:'Second line'},v:'$86M',p:73},
      {n:{es:'Servicios asociados',en:'Attached services'},v:'$71M',p:60},{n:{es:'Canal digital',en:'Digital channel'},v:'$52M',p:44},
      {n:{es:'Otros',en:'Other'},v:'$37M',p:31}]},
    qa:[
      {q:{es:'¿Cómo vamos este mes?',en:'How are we doing this month?'},
       a:{es:'Ingresos en <span class="num">$364M</span>, <span class="pos">+10.1%</span> frente al mes pasado y el mejor mes del trimestre. El margen operativo subió a 19.8%. La señal a vigilar es la cartera: <span class="neg">$14M</span> vencidos, un 34% más que hace 60 días. En un panel real de '+name+' aquí verías tus propias líneas de negocio.',
          en:'Revenue at <span class="num">$364M</span>, <span class="pos">+10.1%</span> over last month and the best month of the quarter. Operating margin rose to 19.8%. The signal to watch is receivables: <span class="neg">$14M</span> overdue, 34% more than 60 days ago. In a real '+name+' dashboard you would see your own business lines here.'}},
      {q:{es:'¿Dónde estoy perdiendo plata?',en:'Where am I losing money?'},
       a:{es:'Dos puntos. <b>1)</b> El costo de operación va en el <span class="neg">80% del ingreso</span>, cuatro puntos arriba del año pasado — el aumento está concentrado en un solo proveedor. <b>2)</b> Tu cuarta fuente de ingreso genera <span class="num">$52M</span> pero consume el 28% del tiempo del equipo; su rentabilidad real es negativa una vez asignas la mano de obra.',
          en:'Two places. <b>1)</b> Operating cost is running at <span class="neg">80% of revenue</span>, four points above last year — the increase is concentrated in a single supplier. <b>2)</b> Your fourth revenue source generates <span class="num">$52M</span> but consumes 28% of team time; its true profitability is negative once labor is allocated.'}},
      {q:{es:'¿Qué debería hacer esta semana?',en:'What should I do this week?'},
       a:{es:'Tres acciones, en orden de impacto: <b>1)</b> Llamar a los 4 clientes en mora — son <span class="neg">$14M</span> y dos de ellos siguen comprando a crédito. <b>2)</b> Renegociar con el proveedor que subió precios; representa el 31% de tu costo. <b>3)</b> Decidir qué hacer con la línea de menor rentabilidad antes de que consuma otro trimestre de equipo.',
          en:'Three actions, in order of impact: <b>1)</b> Call the 4 overdue clients — that is <span class="neg">$14M</span> and two of them are still buying on credit. <b>2)</b> Renegotiate with the supplier that raised prices; it is 31% of your cost. <b>3)</b> Decide what to do with the lowest-margin line before it burns another quarter of team time.'}}]
  };
}

/* ── 3. STUDIO ENGINE ────────────────────────────────────────────── */

let currentInd = 'distribucion';
let currentModIx = 0;
let customInd  = null;
let typeTimer  = null;

const Q = s => document.querySelector(s);
const getInd = id => (id === '__custom' && customInd) ? customInd : (IND.find(i=>i.id===id) || IND[1]);

function buildChips(){
  const box = Q('#indChips'); if(!box) return;
  box.innerHTML = IND.map(i=>
    `<button class="ic${i.id===currentInd?' on':''}" data-ind="${i.id}"><em>${i.ico}</em>${L(i.name)}</button>`
  ).join('') + (customInd ? `<button class="ic${currentInd==='__custom'?' on':''}" data-ind="__custom"><em>✦</em>${L(customInd.name)}</button>` : '');
  box.querySelectorAll('.ic').forEach(b=>b.addEventListener('click',()=>renderIndustry(b.dataset.ind)));
}

function buildIndCards(){
  const box = Q('#indCards'); if(!box) return;
  box.innerHTML = IND.map(i=>`
    <div class="ind" data-ind="${i.id}">
      <span class="ind-i">${i.ico}</span>
      <div class="ind-n">${L(i.name)}</div>
      <div class="ind-d">${L(DESC[i.id])}</div>
      <div class="ind-go">${lang==='es'?'Ver en el demo →':'See it in the demo →'}</div>
    </div>`).join('');
  box.querySelectorAll('.ind').forEach(c=>c.addEventListener('click',()=>{
    /* the interactive demo now lives on its own page; hand off the
       chosen industry via a query param instead of a local tab switch */
    location.href = 'demo/?ind=' + c.dataset.ind;
  }));
}

function buildMarquee(){
  const box = Q('#marq'); if(!box) return;
  const items = lang === 'es'
    ? ['FibraTECH · Manufactura PRFV','Nutriva · Distribución de alimentos','De Gouden Lepel · Restaurante (NL)']
    : ['FibraTECH · FRP manufacturing','Nutriva · Food distribution','De Gouden Lepel · Restaurant (NL)'];
  const row = items.map(t=>`<span class="tm"><i></i>${t}</span>`).join('');
  box.innerHTML = row + row;
}

function buildSectorSelect(){
  const sel = Q('#fSector'); if(!sel) return;
  const keep = sel.value;
  sel.innerHTML = `<option value="">${lang==='es'?'Selecciona un sector':'Select a sector'}</option>`
    + IND.map(i=>`<option value="${L(i.name)}">${i.ico}  ${L(i.name)}</option>`).join('')
    + `<option value="Otro">${lang==='es'?'Otro':'Other'}</option>`;
  if (keep) sel.value = keep;
}

const TAB_IDS = ['producto','modulos','casos','industrias'];

/* switch the visible panel inside the merged #explora tab section */
function showTab(name){
  if (!TAB_IDS.includes(name)) return;
  document.querySelectorAll('.tabpanel').forEach(p=>{ p.hidden = p.dataset.tab !== name; });
  document.querySelectorAll('.tabbtn').forEach(b=>b.classList.toggle('on', b.dataset.tab === name));
  /* elements inside a hidden panel never intersect, so the scroll-reveal
     observer never fires for them — reveal them immediately on tab-in */
  document.querySelectorAll('.tabpanel[data-tab="'+name+'"] .rv').forEach(el=>el.classList.add('in'));
}

/* paint the center dashboard panel for one module of an industry.
   ix 0 is always the industry's own Dashboard fields; ix 1..n-2 pull
   from d.mv (per-module content); the last module (Agente IA) never
   calls this — clicking it focuses the agent column instead. */
function paintModule(d, ix){
  const view = (ix === 0 || !d.mv) ? d : (d.mv[ix-1] || d);

  Q('#mainTitle').textContent = ix === 0 ? L(d.title) : L(d.mods[ix].n);
  Q('#mainSub').textContent   = L(view.sub);

  Q('#kpis').innerHTML = view.kpis.map(k=>
    `<div class="mk"><div class="mk-l">${L(k.l)}</div><div class="mk-v ${k.c||''}">${L(k.v)}</div>
     <div class="mk-d ${k.t?'d-'+k.t:''}">${L(k.d)}</div></div>`).join('');

  Q('#chartT').textContent = L(view.chart.t);
  Q('#chartV').textContent = L(view.chart.v);
  const mx = Math.max(...view.chart.bars);
  Q('#bars').innerHTML = view.chart.bars.map((b,i)=>
    `<i class="bar${b===mx?' hi':''}" style="--h:${Math.round(b/mx*96)}%;animation-delay:${i*.055}s"></i>`).join('');
  Q('#barLbls').innerHTML = view.chart.lbls.map(t=>`<span>${L(t)}</span>`).join('');

  Q('#alertX').innerHTML = L(view.alert);
  Q('#rankT').textContent = L(view.rank.t);
  Q('#rankList').innerHTML = view.rank.items.map(r=>
    `<div class="rk"><span class="rk-n">${L(r.n)}</span>
     <span class="rk-b"><i style="width:${r.p}%"></i></span>
     <span class="rk-v">${L(r.v)}</span></div>`).join('');
}

function renderIndustry(id, keepScroll, modIx){
  const d = getInd(id);
  currentInd = d.id;
  currentModIx = modIx || 0;
  clearTimeout(typeTimer);

  /* chip state */
  document.querySelectorAll('.ic').forEach(b=>b.classList.toggle('on', b.dataset.ind === d.id));

  /* sidebar */
  Q('#sbIcon').textContent   = d.ico;
  Q('#sbName').textContent   = L(d.co);
  Q('#sbSector').textContent = L(d.sector);
  Q('#sbSrc').textContent    = L(d.src);
  const lastIx = d.mods.length - 1;
  Q('#sbNav').innerHTML = d.mods.map((m,ix)=>
    `<button class="sn${ix===currentModIx?' on':''}"><em>${m.i}</em>${L(m.n)}</button>`).join('');
  Q('#sbNav').querySelectorAll('.sn').forEach((b,ix)=>b.addEventListener('click',()=>{
    Q('#sbNav').querySelectorAll('.sn').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    currentModIx = ix;
    if (ix === lastIx) {
      const ai = document.querySelector('.app-ai');
      ai.scrollIntoView({behavior: prefersReduced() ? 'auto' : 'smooth', block:'nearest', inline:'center'});
      if (!prefersReduced()) ai.animate(
        [{boxShadow:'inset 0 0 0 0 var(--gold-e)'},{boxShadow:'inset 0 0 0 3px var(--gold-e)'},{boxShadow:'inset 0 0 0 0 var(--gold-e)'}],
        {duration:900});
    } else {
      paintModule(d, ix);
    }
  }));

  /* header + url */
  Q('#studioUrl').textContent = 'app.calybrat.com/' + (d.custom ? 'demo' : d.id);
  paintModule(d, currentModIx === lastIx ? 0 : currentModIx);

  /* agent */
  const body = Q('#aiBody');
  body.innerHTML = `<div class="sysm">${lang==='es'
    ? 'Conectado a los datos de '+L(d.co)+' · última sincronización: hace 3 min'
    : 'Connected to '+L(d.co)+' data · last sync: 3 min ago'}</div>`;
  addMsg('mq', L(d.qa[0].q));
  showTyping();
  typeTimer = setTimeout(()=>{ hideTyping(); addMsg('ma', L(d.qa[0].a)); }, 950);

  if (!keepScroll && !prefersReduced()) {
    Q('#studioFrame').animate(
      [{opacity:.45,transform:'translateY(8px)'},{opacity:1,transform:'none'}],
      {duration:420,easing:'cubic-bezier(.22,.68,.28,1)'});
  }
}

function prefersReduced(){ return matchMedia('(prefers-reduced-motion: reduce)').matches; }

function addMsg(cls, html){
  const el = document.createElement('div');
  el.className = 'msg ' + cls;
  el.innerHTML = html;
  Q('#aiBody').appendChild(el);
  Q('#aiBody').scrollTop = Q('#aiBody').scrollHeight;
}
function showTyping(){
  const t = document.createElement('div');
  t.className = 'typing'; t.id = 'typing';
  t.innerHTML = '<i></i><i></i><i></i>';
  Q('#aiBody').appendChild(t);
  Q('#aiBody').scrollTop = Q('#aiBody').scrollHeight;
}
function hideTyping(){ const t = Q('#typing'); if (t) t.remove(); }

function customIndustry(e){
  e.preventDefault();
  const raw = Q('#freeInput').value.trim();
  if (!raw) return false;
  const hit = matchIndustry(raw);
  if (hit) { renderIndustry(hit); }
  else { customInd = genericFor(raw); buildChips(); renderIndustry('__custom'); }
  Q('#freeInput').value = '';
  Q('#studioFrame').scrollIntoView({behavior:'smooth',block:'center'});
  return false;
}

/* ── 4. PAGE INTERACTIONS ────────────────────────────────────────── */

/* scroll reveal */
const revObs = new IntersectionObserver(es=>{
  es.forEach(en=>{ if (en.isIntersecting){ en.target.classList.add('in'); revObs.unobserve(en.target); } });
}, {threshold:.12, rootMargin:'0px 0px -40px'});

/* count up */
function countUp(el){
  const target = +el.dataset.target; if (!target) return;
  el.textContent = 0;
  const dur = 1500, t0 = performance.now();
  (function tick(now){
    const p = Math.min((now - t0)/dur, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
  })(t0);
}
const cntObs = new IntersectionObserver(es=>{
  es.forEach(en=>{ if (en.isIntersecting){ countUp(en.target); cntObs.unobserve(en.target); } });
}, {threshold:.6});

/* boot */
document.addEventListener('DOMContentLoaded', ()=>{
  document.documentElement.style.setProperty('--logo', 'url(data:image/png;base64,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)');
  Q('#yr').textContent = new Date().getFullYear();

  captureES();
  buildMarquee(); buildChips(); buildIndCards(); buildSectorSelect();
  if (document.getElementById('studioFrame')) {
    /* the demo page accepts a shareable ?ind=hoteleria deep link so a
       rep can send a prospect straight into their own industry view */
    const wanted = new URLSearchParams(location.search).get('ind');
    const validId = (wanted && IND.some(i=>i.id===wanted)) ? wanted : currentInd;
    renderIndustry(validId, true);
  }

  let saved = null;
  try { saved = localStorage.getItem('cb_lang'); } catch(e) {}
  if (saved === 'en') applyLang('en');

  document.querySelectorAll('.rv').forEach(el=>revObs.observe(el));
  document.querySelectorAll('.count[data-target]').forEach(el=>cntObs.observe(el));

  /* nav */
  const nav = Q('#nav');
  const onScroll = ()=> nav.classList.toggle('on', scrollY > 30);
  addEventListener('scroll', onScroll, {passive:true}); onScroll();

  const burger = Q('#burger'), mob = Q('#mob');
  burger.addEventListener('click', ()=>{ mob.classList.toggle('open'); burger.classList.toggle('x'); });
  mob.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
    mob.classList.remove('open'); burger.classList.remove('x');
  }));
  addEventListener('resize', ()=>{ if (innerWidth > 960){ mob.classList.remove('open'); burger.classList.remove('x'); } });

  /* explore tabs */
  document.querySelectorAll('.tabbtn').forEach(b=>b.addEventListener('click', ()=>showTab(b.dataset.tab)));
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    const id = a.getAttribute('href').slice(1);
    if (!TAB_IDS.includes(id)) return;
    a.addEventListener('click', e=>{
      e.preventDefault();
      showTab(id);
      Q('#explora').scrollIntoView({behavior: prefersReduced() ? 'auto' : 'smooth', block:'start'});
    });
  });
  /* a cross-page link like ../index.html#modulos should land on that tab, not just the tab bar */
  if (location.hash && TAB_IDS.includes(location.hash.slice(1))) showTab(location.hash.slice(1));

  /* contact form (only the dedicated /contacto/ page has one now) */
  const form = Q('#cform');
  if (form) form.addEventListener('submit', async ev=>{
    ev.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const old = btn.textContent;
    btn.textContent = lang === 'es' ? 'Enviando…' : 'Sending…';
    btn.disabled = true;
    try {
      await fetch(form.action, {method:'POST', body:new FormData(form), headers:{'Accept':'application/json'}});
      form.reset();
      Q('#fok').style.display = 'block';
      Q('#fok').scrollIntoView({behavior:'smooth', block:'center'});
    } catch(err) {
      window.location.href = 'mailto:contact@calybrat.com?subject=' +
        encodeURIComponent('Consulta desde calybrat.com');
    } finally {
      btn.textContent = old; btn.disabled = false;
    }
  });
});

/* remember language choice */
const _toggle = toggleLang;
toggleLang = function(){ _toggle(); try{ localStorage.setItem('cb_lang', lang); }catch(e){} };

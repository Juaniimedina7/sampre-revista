/**
 * Artículos de la RAMP
 * Para agregar un artículo, agregá un objeto al array articles.
 *
 * Estructura de cada artículo:
 * {
 *   slug: 'titulo-corto-del-articulo',   // URL-friendly, sin espacios ni acentos
 *   title: 'Título completo del artículo',
 *   titleEn: 'Full title in English',
 *   type: 'original',   // 'original' | 'revision' | 'caso' | 'serie' | 'protocolo' | 'especial' | 'carta'
 *   authors: [
 *     {
 *       name: 'Dr. Juan Pérez',
 *       affiliation: 'Hospital General de Buenos Aires',
 *       email: 'jperez@hospital.com.ar',
 *       orcid: null,
 *       isCorresponding: true,
 *     }
 *   ],
 *   keywords: ['medicina prehospitalaria', 'emergencias'],
 *   keywordsEn: ['prehospital medicine', 'emergencies'],
 *   abstract: 'Resumen en español...',
 *   abstractEn: 'Abstract in English...',
 *   issueId: 1,           // id del número en issues.js
 *   doi: null,            // DOI cuando esté disponible
 *   pages: '1-12',
 *   receivedDate: '2025-06-01',
 *   acceptedDate: '2025-07-15',
 *   publishedDate: '2025-09-01',
 *   pdfUrl: '/pdfs/vol1-num1/titulo.pdf',
 *   heroImage: null,      // opcional, URL absoluta o /path local
 *   videoUrl: null,       // opcional, embed YouTube
 *   sections: [           // opcional — si presente, muestra cuerpo HTML + TOC en sidebar
 *     { heading: 'Introducción', body: '<p>...</p>' },
 *     { heading: 'Métodos',      body: '<p>...</p>' },
 *     { heading: 'Resultados',   body: '<p>...</p>' },
 *     { heading: 'Conclusiones', body: '<p>...</p>' },
 *   ],
 * }
 */

export const articles = [
  {
    slug: 'aplicabilidad-ssc-2026-shock-septico-pediatrico',
    title: 'Aplicabilidad prehospitalaria de la Surviving Sepsis Campaign 2026 en shock séptico pediátrico: revisión crítica y propuesta operativa',
    titleEn: 'Prehospital Applicability of the Surviving Sepsis Campaign 2026 in Pediatric Septic Shock: A Critical Review and Operational Recommendations',
    type: 'revision',
    authors: [
      {
        name: 'Norma B. Raúl',
        affiliation: 'Universidad Nacional Arturo Jauretche (UNAJ); Hospital de Alta Complejidad en Red El Cruce, Florencio Varela, Buenos Aires; Comité de Pediatría SAMPRE; Comité de Reanimación Pediátrica SATI',
        email: 'nbraul@unaj.edu.ar',
        orcid: null,
        isCorresponding: true,
      },
      {
        name: 'Adriana Bordogna',
        affiliation: 'Hospital de Alta Complejidad en Red El Cruce, Florencio Varela; Hospital Sor María Ludovica, La Plata; Comité de Shock Pediátrico SATI',
        email: null,
        orcid: null,
        isCorresponding: false,
      },
    ],
    keywords: ['Sepsis', 'Choque Séptico', 'Servicios Médicos de Emergencia', 'Pediatría', 'Reanimación'],
    keywordsEn: ['Sepsis', 'Shock, Septic', 'Emergency Medical Services', 'Pediatrics', 'Resuscitation'],
    abstract: 'Introducción: Las Guías Internacionales de la Surviving Sepsis Campaign 2026 (SSC 2026) consolidan un cambio paradigmático en la reanimación del shock séptico pediátrico de particular relevancia extrahospitalaria: restringir los bolos de fluidos en ausencia de hipotensión cuando no se dispone de unidad de cuidados intensivos (UCI). En pediatría la hipotensión es un signo tardío, por lo que la mayoría de los niños con shock atendidos en el campo conservan presión arterial normal. Objetivo: Analizar críticamente la aplicabilidad de las recomendaciones de mayor jerarquía de la SSC 2026 al sistema de emergencias médicas extrahospitalario de recursos limitados y elaborar una propuesta operativa contextualizada para el reconocimiento, la decisión inicial de fluidoterapia, el acceso vascular, el traslado y la eventual indicación de vasopresores periféricos en shock séptico pediátrico. Métodos: Revisión narrativa crítica con análisis de transferibilidad. Mediante muestreo intencional se seleccionaron tres fuentes primarias: una guía internacional de práctica clínica (SSC 2026), un consenso regional (SLACIP 2022) y un marco educativo-operativo prehospitalario (PEPP); el análisis se orientó por los dominios de contextualización del marco GRADE-ADOLOPMENT, sin constituir una adaptación formal. Se construyeron tablas de decisión contextualizadas para el entorno de Servicios de Emergencias Médicas prehospitalarias (SEM) de recursos limitados. Resultados: La recomendación fuerte, con evidencia de alta certeza, de no administrar bolos en ausencia de hipotensión y sin UCI disponible exige reconceptualizar el reconocimiento del shock pediátrico, que en el prehospitalario se basa en signos de perfusión (TEP) y no en la presión arterial. El análisis identificó cuatro barreras de transferibilidad: nivel formativo del personal, disponibilidad de monitoreo, tiempos de traslado y acceso a UCI pediátrica. Conclusiones: La implementación de la SSC 2026 en el SEM requiere una contextualización explícita que reconozca las limitaciones de recursos y la fisiopatología propia del shock pediátrico. El shock pediátrico debe sospecharse por signos de hipoperfusión y no descartarse por presión arterial normal; sin embargo, en servicios sin UCI disponible, la hipotensión conserva un rol operativo para decidir bolos de fluidos.',
    abstractEn: 'Background: The Surviving Sepsis Campaign International Guidelines 2026 (SSC 2026) consolidate a paradigm shift in pediatric septic shock resuscitation of particular prehospital relevance: restricting fluid boluses in the absence of hypotension when no intensive care unit (ICU) is available. In children, hypotension is a late sign, so most children in shock encountered in the field retain a normal blood pressure. Objective: To critically analyze the applicability of the top-level recommendations of SSC 2026 to the resource-limited out-of-hospital emergency medical system and to develop a context-specific operational proposal for the assessment, initial fluid therapy decision, vascular access, transport, and eventual use of peripheral vasopressors in pediatric septic shock. Methods: Critical narrative review with a transferability analysis. Three primary sources were selected using purposive sampling: SSC 2026, SLACIP 2022, and PEPP framework; analysis was guided by the GRADE-ADOLOPMENT contextualization domains. Contextualized decision tables were developed for resource-limited prehospital EMS settings. Results: The strong recommendation, supported by high-certainty evidence, against fluid boluses in the absence of hypotension and without available ICU requires reconceptualizing pediatric shock recognition, which in the prehospital setting relies on perfusion signs (Pediatric Assessment Triangle) rather than blood pressure. Four transferability barriers were identified: staff training level, monitoring availability, transport times, and access to a pediatric ICU. Conclusions: Implementing SSC 2026 in EMS requires explicit contextualization that acknowledges resource constraints and the distinct pathophysiology of pediatric shock.',
    issueId: 1,
    doi: null,
    pages: '1-16',
    receivedDate: '2026-02-10',
    acceptedDate: '2026-04-05',
    publishedDate: '2026-05-15',
    pdfUrl: '/pdfs/vol1-num1/aplicabilidad-ssc-2026-shock-septico-pediatrico.pdf',
    heroImage: '/images/portadas/survivingSepsisCampaign2026.png',
    videoUrl: null,
  },
  {
    slug: 'modelo-predictivo-15k-adizero-2026',
    title: 'Modelo predictivo de demanda asistencial en carreras de calle: desarrollo, aplicación y validación prospectiva en la 15K Adizero Buenos Aires 2026',
    titleEn: 'Predictive model of medical demand in road races: development, implementation and prospective validation at the 15K Adizero Buenos Aires 2026',
    type: 'original',
    authors: [
      {
        name: 'Diego Pizzini',
        affiliation: 'EMERTEAM Sports Risks & Emergency Management, Buenos Aires; Certified World Athletics Race Emergency Medicine Director; Licenciatura en Protección Civil y Emergencias (tesista), UNTREF; Secretario del Comité de Reanimación, SAMPRE',
        email: null,
        orcid: null,
        isCorresponding: true,
      },
      {
        name: 'Agustín Astorga',
        affiliation: 'EMERTEAM Sports Risks & Emergency Management; Certified World Athletics Race Emergency Medicine Director',
        email: null,
        orcid: null,
        isCorresponding: false,
      },
      {
        name: 'Lucas Villoria',
        affiliation: 'Licenciatura en Protección Civil y Emergencias (tesista), UNTREF; Técnico Universitario en Protección Civil y Emergencias, UNTREF',
        email: null,
        orcid: null,
        isCorresponding: false,
      },
    ],
    keywords: ['Athletic Performance', 'Servicios Médicos de Emergencia', 'Concentraciones Masivas', 'Evaluación de Riesgos', 'Colapso Asociado al Ejercicio'],
    keywordsEn: ['road racing', 'medical demand prediction', 'mass-participation events', 'WBGT', 'sports emergency medicine'],
    abstract: 'Introducción: Las carreras populares de calle presentan una demanda asistencial cuya distribución espaciotemporal es impredecible en ausencia de datos empíricos propios del evento. La planificación de dispositivos de emergencias en este contexto carece de modelos predictivos prospectivos validados en el contexto latinoamericano. Métodos: Estudio observacional prospectivo de cohorte única con componente predictivo-validatorio (protocolo pre-registrado en OSF: 07/06/2026). Se analizaron 5.845 inscriptos mediante un modelo de estratificación de riesgo de seis niveles (sexo × edad). Se estimaron tasas de demanda asistencial a partir de la literatura de referencia, ajustadas por perfil epidemiológico y modificador ambiental (WBGT). El registro ambiental fue realizado con estación AcuRite Atlas 7-en-1 y medidor de WBGT dedicado. Los incidentes fueron registrados en planilla estandarizada y cruzados con la base de inscriptos. Los horarios de atención fueron contrastados con la curva real de llegadas a meta (chip timing). Resultados: Se registraron 7 pacientes únicos (10 atenciones totales, 3 escaladas de nivel asistencial) sobre 5.192 finishers. Tasa: 1,35/1.000 finishers. Código 100% verde. Cero traslados. Cero SCA. El modelo predijo 24 incidentes (sobrepredicción ×3,4), explicada por perfil competitivo superior al asumido (H35+ P90 real: 6:47 min/km vs. 9:00 min/km estimado), humedad significativamente mayor (86–90% vs. ~75% proyectado) y WBGT superior al proyectado (15,7–17,6 °C vs. 8–11 °C), aunque dentro de la categoría LOW World Athletics. El 100% de las atenciones ocurrió en el puesto de llegada, con distribución temporal correlacionada con la curva de llegadas a meta (minutos 75–138 post-largada). Conclusiones: La concentración del 100% de las atenciones en el área de meta, correlacionada con la curva de llegadas, constituye el hallazgo operativo principal. El modelo fue preciso en los parámetros de timing y sobrepredictor en la demanda asistencial total. Los datos empíricos del evento definen la línea de base para la calibración del modelo en ediciones sucesivas.',
    abstractEn: null,
    issueId: 1,
    doi: null,
    pages: '17-34',
    receivedDate: '2026-06-08',
    acceptedDate: '2026-07-22',
    publishedDate: '2026-09-01',
    pdfUrl: '/pdfs/vol1-num1/modelo-predictivo-15k-adizero-2026.pdf',
    heroImage: null,
    videoUrl: null,
  },
  {
    slug: 'rutas-en-riesgo-estado-camino-emergencia',
    title: 'Rutas en riesgo: cuando el estado del camino anticipa la emergencia',
    titleEn: 'Routes at risk: when the condition of the road anticipates an emergency',
    type: 'especial',
    authors: [
      {
        name: 'Mg. Gabriel Sosa Hidalgo',
        affiliation: 'Coordinador de la Tecnicatura en Emergencias Sanitarias y Desastres, Universidad Nacional Arturo Jauretche; Vicepresidente de la Sociedad Argentina de Medicina Prehospitalaria (SAMPRE); Coordinador del Área de Docencia, Dirección de Manejo de Emergencias y Catástrofes, Ministerio de Salud de la Provincia de Buenos Aires',
        email: null,
        orcid: null,
        isCorresponding: true,
      },
    ],
    keywords: ['seguridad vial', 'trauma', 'emergencias sanitarias', 'gestión del riesgo', 'infraestructura vial', 'preparación para desastres'],
    keywordsEn: ['road safety', 'trauma', 'emergency medical services', 'risk management', 'road infrastructure', 'disaster preparedness'],
    abstract: 'El deterioro progresivo de la infraestructura vial en Argentina representa un problema creciente de salud pública y gestión del riesgo. El aumento del tránsito vehicular, combinado con rutas en estado regular o malo, incrementa la probabilidad de incidentes viales con consecuencias humanas, sociales y económicas significativas. El presente artículo analiza la relación entre el estado de las rutas y la demanda sobre los sistemas de emergencias sanitarias, considerando la necesidad de fortalecer la preparación prehospitalaria y hospitalaria frente a eventos traumáticos tiempo-dependientes. A partir de datos sobre la red vial nacional y ejemplos de corredores críticos, se reflexiona sobre la importancia de la planificación interdisciplinaria, la capacitación continua del personal, la disponibilidad de recursos y la articulación interinstitucional. Asimismo, se destaca la necesidad de políticas públicas sostenidas orientadas a la inversión en infraestructura vial y al fortalecimiento de los sistemas de respuesta sanitaria.',
    abstractEn: 'The progressive deterioration of road infrastructure in Argentina represents a growing public health and risk management challenge. Increasing traffic flow, combined with roads in fair or poor condition, raises the likelihood of road incidents with significant human, social, and economic consequences. This article analyzes the relationship between road conditions and the burden placed on emergency medical systems, emphasizing the need to strengthen prehospital and hospital preparedness for time-dependent traumatic events. Based on national road network data and examples of critical corridors, the paper reflects on the importance of interdisciplinary planning, continuous professional training, resource availability, and interagency coordination. It also highlights the need for sustained public policies aimed at investing in road infrastructure and strengthening healthcare response systems.',
    issueId: 1,
    doi: null,
    pages: '35-39',
    receivedDate: '2026-01-20',
    acceptedDate: '2026-03-15',
    publishedDate: '2026-05-01',
    pdfUrl: '/pdfs/vol1-num1/rutas-en-riesgo.pdf',
    heroImage: null,
    videoUrl: null,
  },
  {
    slug: 'sistemas-eph-argentina-historia-organizacion-desafios',
    title: 'Sistemas de emergencias prehospitalarias en Argentina: historia, organización y desafíos actuales',
    titleEn: 'Prehospital emergency systems in Argentina: history, organization and current challenges',
    type: 'revision',
    authors: [
      {
        name: 'William A. Medina',
        affiliation: 'Director General de Emergencias del Sistema de Emergencias de Lanús (SEL); Miembro fundador y Presidente de la Sociedad Argentina de Medicina Prehospitalaria (SAMPRE); Profesor Adjunto de la Tecnicatura en Emergencias Sanitarias y Desastres, Universidad Nacional Arturo Jauretche (UNAJ); Subdirector de la Carrera de Especialista en Cirugía Torácica, Hospital Bicentenario (UBA)',
        email: 'williamalbertomedina@gmail.com',
        orcid: null,
        isCorresponding: true,
      },
    ],
    keywords: ['Emergencias médicas', 'Atención prehospitalaria', 'Sistemas de salud', 'Argentina', 'Servicios de ambulancia'],
    keywordsEn: ['Medical emergencies', 'Prehospital care', 'Health systems', 'Argentina', 'Ambulance services'],
    abstract: 'Introducción: Los sistemas de emergencias prehospitalarias (SEPH) constituyen un componente esencial en la atención de urgencias, integrando la respuesta inicial, estabilización y traslado de pacientes. En Argentina, su desarrollo ha sido heterogéneo, con participación de subsistemas públicos y privados. Objetivo: Describir la evolución histórica, organización actual y principales desafíos de los SEPH en Argentina. Métodos: Se realizó una revisión narrativa no sistemática utilizando normativa nacional y provincial, literatura científica indexada, documentos institucionales y textos históricos relacionados con los sistemas de emergencias prehospitalarias en Argentina. Se consultaron bases de datos biomédicas y fuentes oficiales. Resultados: El desarrollo de los SEPH en Argentina se inicia a fines del siglo XIX con la Asistencia Pública de Buenos Aires. Durante el siglo XX se consolidan estructuras organizadas. Desde la década de 1980, el sector privado adquiere un rol relevante, incorporando tecnología, capacitación y modelos de respuesta avanzados. Actualmente coexisten sistemas públicos municipales y provinciales con empresas privadas que cubren una proporción significativa de la población. Persisten diferencias regionales en recursos, tiempos de respuesta y nivel de complejidad. Conclusiones: Los SEPH en Argentina presentan un modelo fragmentado con avances significativos en profesionalización y tecnología. La integración público-privada, la regulación homogénea y la formación de recursos humanos constituyen desafíos centrales para mejorar la calidad y equidad en la atención.',
    abstractEn: 'Introduction: Prehospital emergency medical services (PHES) are an essential component of emergency care, integrating initial response, stabilization, and patient transport. In Argentina, their development has been heterogeneous, with the participation of both public and private subsystems. Objective: To describe the historical evolution, current organization, and main challenges of PHE in Argentina. Methods: A non-systematic narrative review was conducted using national and provincial regulations, indexed scientific literature, institutional documents, and historical texts related to prehospital emergency systems in Argentina. Biomedical databases and official sources were consulted. Results: The development of PHE in Argentina began in the late 19th century with the Public Assistance of Buenos Aires. Organized structures were consolidated during the 20th century. Since the 1980s, the private sector has acquired a significant role, incorporating technology, training, and advanced response models. Currently, municipal and provincial public systems coexist with private companies that cover a significant proportion of the population. Regional differences persist in resources, response times, and level of complexity. Conclusions: PHE in Argentina presents a fragmented model with significant advances in professionalization and technology. Public-private integration, standardized regulation, and human resource development are key challenges for improving the quality and equity of care.',
    issueId: 1,
    doi: null,
    pages: '40-53',
    receivedDate: '2026-01-05',
    acceptedDate: '2026-03-12',
    publishedDate: '2026-05-01',
    pdfUrl: '/pdfs/vol1-num1/sistemas-eph-argentina-historia.pdf',
    heroImage: null,
    videoUrl: null,
  },
]

export const ARTICLE_TYPES = {
  original:  { label: 'Artículo Original',          maxWords: 4000, color: 'primary' },
  revision:  { label: 'Revisión',                   maxWords: 5000, color: 'secondary' },
  caso:      { label: 'Reporte de Caso',             maxWords: 2000, color: 'emerald' },
  serie:     { label: 'Serie de Casos',              maxWords: 3000, color: 'amber' },
  protocolo: { label: 'Protocolo / Guía Operativa',  maxWords: null,  color: 'violet' },
  especial:  { label: 'Artículo Especial',           maxWords: null,  color: 'teal' },
  carta:     { label: 'Carta al Editor',             maxWords: 800,   color: 'rose' },
}

export function getArticlesByIssue(issueId) {
  return articles.filter((a) => a.issueId === issueId)
}

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug) || null
}

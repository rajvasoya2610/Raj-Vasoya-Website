import { PersonalInfo, CaseStudy, ProjectItem, SkillCategory } from '../types/portfolio.ts';

/**
 * ============================================================================
 * 📝 PORTFOLIO DATA FILE - EASY TO EDIT EVEN IF YOU DON'T KNOW HOW TO CODE!
 * ============================================================================
 * To edit your information:
 * 1. Change the text between the quotes (e.g., name: "Your Name")
 * 2. To add a project, simply copy an existing project block and paste it below.
 * 3. Or use the built-in "✏️ Edit Portfolio" button directly inside the website!
 * ============================================================================
 */

export const INITIAL_PERSONAL_INFO: PersonalInfo = {
  name: "Alex Vance",
  roleTitle: "Sketch Artist • Data Analyst • Design Engineer",
  tagline: "Bridging Art, Analytical Thinking, and Engineering Design",
  bio: "I operate at the intersection of creative aesthetic vision, empirical data analytics, and physical mechanical engineering. By merging freehand concept sketch ideation with statistical modeling and parametric 3D CAD execution, I take ambiguous ideas from napkin drawings to fully engineered, production-ready solutions.",
  location: "San Francisco, CA / Remote",
  email: "alex.vance.portfolio@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://x.com",
  instagram: "https://instagram.com",
  availableForHire: true
};

export const PILLARS_CONFIG = [
  {
    id: 'art',
    name: 'Sketch Artist',
    badge: 'The Vision',
    color: '#A855F7', // Purple
    gradient: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
    borderGlow: 'hover:border-purple-500/40',
    tag: 'Ideation & Aesthetics',
    headline: 'Unconstrained Visual Exploration & Form Studies',
    description: 'Rapid hand drafting, anatomical ergonomics, spatial proportioning, and concept rendering that establish emotional resonance and human-centered design before touching digital software.',
    skills: ['Hand Drafting', 'Digital Charcoal & Pen', 'Ergonomic Form Studies', 'Ideation Sketching', 'Storyboarding', 'Proportion Analysis']
  },
  {
    id: 'data',
    name: 'Data Analyst',
    badge: 'The Validation',
    color: '#06B6D4', // Cyan
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    borderGlow: 'hover:border-cyan-500/40',
    tag: 'Empirical Evidence',
    headline: 'FEA Simulation, Telemetry & Feasibility Analytics',
    description: 'Transforming qualitative aesthetics into quantified criteria. Statistical stress-strain analysis, aerodynamic regressions, parametric optimization algorithms, and sensor telemetry validation.',
    skills: ['Python / Pandas', 'FEA Stress Modeling', 'Statistical Regression', 'CFD Aerodynamics', 'Sensor Telemetry', 'Optimization Algorithms']
  },
  {
    id: 'engineering',
    name: 'Design Engineer',
    badge: 'The Solution',
    color: '#F59E0B', // Amber
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderGlow: 'hover:border-amber-500/40',
    tag: 'Physical Execution',
    headline: 'Parametric CAD Modeling & Precision Mechanical Assemblies',
    description: 'Bridging sketches and data into physical reality: complex surface modeling, kinematic linkages, injection mold tooling, GD&T tolerance stackups, and functional rapid prototypes.',
    skills: ['Parametric 3D CAD', 'SolidWorks / Fusion 360', 'Kinematic Linkages', 'GD&T Tolerances', 'DFM / DFA', 'CNC & 3D Prototyping']
  }
];

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aero-drone-gimbal',
    title: 'AeroDynamic 3-Axis Stabilizer Gimbal',
    subtitle: 'From Gestural Organic Sketches to FEA-Optimized Milled Aluminum',
    category: 'hybrid',
    completionDate: '2026',
    featured: true,
    summary: 'A high-speed camera stabilization gimbal engineered to withstand high wind turbulence while remaining ultralight. Seamlessly combines aerodynamic organic curves with FEA vibrational modal analysis.',
    heroImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    impactMetrics: [
      { label: 'Mass Reduction', value: '38%' },
      { label: 'Torsional Rigidity', value: '+45%' },
      { label: 'Drag Coeff (Cd)', value: '0.24' }
    ],
    toolsUsed: ['Analog Marker Sketching', 'Python / SciPy', 'SolidWorks CAD', 'ANSYS FEA', '5-Axis CNC'],
    sketchStage: {
      title: 'Phase 1: The Vision (Sketching & Ergonomics)',
      subtitle: 'Freehand form exploration & airflow channeling studies',
      description: 'Began with 40+ iterative graphite and marker thumbnail sketches exploring avian wing skeletal structures to achieve organic, unencumbered freedom of rotation.',
      keyPoints: [
        'Anatomical bone structure ideation for weight distribution',
        'Direct airflow bypass channels drafted to divert downdraft eddies',
        'Motor knuckle wire routing integration sketched directly into frame ribbing'
      ],
      metrics: [
        { label: 'Concept Drafts', value: '42' },
        { label: 'Selected Direction', value: 'V-Rib organic frame' }
      ],
      visualType: 'sketch',
      tags: ['Ideation', 'Marker Render', 'Form Factor']
    },
    dataStage: {
      title: 'Phase 2: The Validation (Data & FEA Feasibility)',
      subtitle: 'Vibrational telemetry & statistical stress distribution',
      description: 'Tested initial geometry with Monte Carlo simulations under turbulent wind tunnel conditions (15-45 m/s). Python scripts parsed accelerometer gyro telemetry to detect harmonic resonances.',
      keyPoints: [
        'Isolated 120Hz drone motor resonant harmonic to prevent camera jitter',
        'FEA topology optimization highlighted non-load-bearing pockets for material removal',
        'Empirical safety factor computed across 10,000 cyclic load steps'
      ],
      metrics: [
        { label: 'Resonant Peak Shifted', value: '+85 Hz' },
        { label: 'Min Safety Factor', value: '2.4x' },
        { label: 'Simulated Cycles', value: '500,000' }
      ],
      visualType: 'data-chart',
      tags: ['Telemetry', 'ANSYS FEA', 'Python', 'Monte Carlo']
    },
    cadStage: {
      title: 'Phase 3: The Solution (CAD & Engineering Model)',
      subtitle: 'Parametric assembly, internal wiring, and CNC manufacturing',
      description: 'Constructed complete parametric assembly in CAD with Class-A surface continuity, sealed bearing housings, and 0.015mm GD&T tolerances for 7075-T6 anodized aerospace aluminum.',
      keyPoints: [
        'Fully constrained kinematic assembly with 360-degree slip-ring pass-through',
        'Thermal dissipation fins incorporated directly into brushless motor stators',
        'CNC 5-axis toolpath optimized to reduce machine run time by 22%'
      ],
      metrics: [
        { label: 'Total Component Count', value: '18 parts' },
        { label: 'Final Weight', value: '215 grams' },
        { label: 'Tolerance Grade', value: 'ISO 2768-m' }
      ],
      visualType: 'cad-model',
      tags: ['Parametric CAD', 'DFM', 'SolidWorks', '7075-T6 Aluminum']
    }
  },
  {
    id: 'prosthetic-bionic-grip',
    title: 'Adaptive Biomechanical Prosthetic Hand',
    subtitle: 'Human Gesture Ideation Meets Strain Gauge Telemetry & Multi-Material 3D Printing',
    category: 'hybrid',
    completionDate: '2026',
    featured: true,
    summary: 'A lightweight prosthetic grip utilizing compliant multi-stable linkages. Integrates tactile pressure sensor distributions into a human-centered aesthetic shell.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    impactMetrics: [
      { label: 'Pinch Force', value: '42 N' },
      { label: 'Unit Production Cost', value: '-62%' },
      { label: 'Response Latency', value: '48 ms' }
    ],
    toolsUsed: ['Charcoal & Digital Sketching', 'NumPy / Matplotlib', 'Fusion 360', 'Multi-material SLA', 'ESP32'],
    sketchStage: {
      title: 'Phase 1: The Vision (Sketching & Gesture Studies)',
      subtitle: 'Exploration of graceful human gesture and natural resting postures',
      description: 'Unlike robotic-looking claws, sketches emphasized sculptural harmony and proportion matching anthropometric human dimensions for psychological acceptance and natural aesthetic.',
      keyPoints: [
        'Dynamic gesture studies in relaxed, gripping, and pinch states',
        'Sculptural contours designed to mask mechanical servo servos',
        'Soft skin-contact silicone pad curves hand-drawn with cross-contouring'
      ],
      metrics: [
        { label: 'Hand Studies', value: '60+' },
        { label: 'Grip Modes', value: '7 primary' }
      ],
      visualType: 'sketch',
      tags: ['Anthropometry', 'Gesture Studies', 'Aesthetic Integration']
    },
    dataStage: {
      title: 'Phase 2: The Validation (Sensory Data & Grip Analytics)',
      subtitle: 'Piezoelectric sensor matrix and grip force distribution analytics',
      description: 'Collected 14,000 real-world tactile grasp logs across common household objects (eggs, keys, cans). Modeled closed-loop PID curves to ensure fragile objects are never crushed.',
      keyPoints: [
        'Tactile array heatmaps recorded continuous contact surface area',
        'Fatigue life prediction regression: zero joint failure over 1.2M cycles',
        'EMG muscle signal filtering with real-time digital bandpass filter'
      ],
      metrics: [
        { label: 'Tactile Sampling', value: '250 Hz' },
        { label: 'Fragile Success Rate', value: '99.4%' },
        { label: 'Signal-to-Noise Ratio', value: '38 dB' }
      ],
      visualType: 'data-chart',
      tags: ['Sensory Analytics', 'PID Curves', 'Fatigue Testing']
    },
    cadStage: {
      title: 'Phase 3: The Solution (Compliant CAD Mechanism)',
      subtitle: 'Compliant flexure hinges with snap-fit carbon-fiber reinforced links',
      description: 'Created a zero-backlash compliant mechanism that reduces pin joint count from 18 to 4 by leveraging controlled material elasticity in TPU and carbon-doped nylon.',
      keyPoints: [
        'Monolithic finger linkage prints in one pass with zero assembly required',
        'Quick-release magnetic magnetic wrist coupler with waterproof seal',
        'Sub-millimeter wire cable tendons routed along curved internal lumens'
      ],
      metrics: [
        { label: 'Moving Parts', value: 'Reduced by 68%' },
        { label: 'Grip Speed', value: '0.35 sec' },
        { label: 'Total Weight', value: '340g' }
      ],
      visualType: 'cad-model',
      tags: ['Compliant Mechanisms', 'Additive Mfg', 'SLA / SLS', 'Biomimicry']
    }
  },
  {
    id: 'biomimetic-heat-sink',
    title: 'Biomimetic Conformal Heat Exchanger',
    subtitle: 'Marine Coral Surface Studies ──► CFD Thermodynamic Regressions ──► DMLS Titanium',
    category: 'hybrid',
    completionDate: '2025',
    featured: true,
    summary: 'An ultra-compact thermal management core for high-density power electronics, featuring gyroid minimal surfaces inspired by sea sponge geometry and validated through Navier-Stokes CFD.',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    impactMetrics: [
      { label: 'Thermal Dissipation', value: '+54%' },
      { label: 'Volume Envelope', value: '-42%' },
      { label: 'Pressure Drop', value: '-18%' }
    ],
    toolsUsed: ['Cross-hatch Technical Sketching', 'OpenFOAM CFD', 'nTopology CAD', 'Direct Metal Laser Sintering'],
    sketchStage: {
      title: 'Phase 1: The Vision (Biomimetic Form Studies)',
      subtitle: 'Observations of coral reef micro-channels and fluid vortex generation',
      description: 'Sketched complex triply periodic minimal surface (TPMS) concepts by hand, exploring how coral branches self-organize to maximize fluid contact while minimizing boundary layer stagnancy.',
      keyPoints: [
        'Hand-drawn fluid flow vortex streamlines around curvature inflection points',
        'Sectional slice sketches illustrating gradual internal manifold expansion',
        'Aesthetic exterior housing that doubles as an exhibition piece'
      ],
      metrics: [
        { label: 'Surface Form Variants', value: '28' },
        { label: 'Chosen Architecture', value: 'Schoen Gyroid' }
      ],
      visualType: 'sketch',
      tags: ['Biomimicry', 'Surface Sketching', 'Fluid Dynamics']
    },
    dataStage: {
      title: 'Phase 2: The Validation (CFD & Heat Flux Analytics)',
      subtitle: 'Multivariate parameter sweeps across Reynolds numbers and pressure drops',
      description: 'Ran 180 Navier-Stokes computational fluid dynamic iterations. Applied regression models to determine the optimal wall thickness (0.42mm) balancing fluid turbulence with thermal conduction.',
      keyPoints: [
        'Discovered localized micro-vortices that enhanced heat flux coefficient by 2.2x',
        'Statistical validation against experimental thermocouple test rig data',
        'Regression curves plotted thermal resistance versus pump pumping work'
      ],
      metrics: [
        { label: 'Heat Flux Coeff', value: '1850 W/m²K' },
        { label: 'Reynolds Number', value: '2,400' },
        { label: 'Correlation (R²)', value: '0.984' }
      ],
      visualType: 'data-chart',
      tags: ['CFD Analytics', 'Heat Transfer', 'Parametric Sweep']
    },
    cadStage: {
      title: 'Phase 3: The Solution (Additive Metal CAD Model)',
      subtitle: 'Self-supporting titanium lattice built with zero internal support structures',
      description: 'Engineered in nTopology with continuous wall thickness gradient. Built via Direct Metal Laser Sintering (DMLS) in Ti-6Al-4V alloy with fully integrated O-ring fluid manifolds.',
      keyPoints: [
        'Overhang angles constrained to >45 degrees to eliminate internal support scaffolding',
        'Helical internal baffles with uniform surface roughness for turbulent boundary mixing',
        'Helium leak tested up to 12.5 bar operating pressure'
      ],
      metrics: [
        { label: 'Surface-to-Volume Ratio', value: '1420 m²/m³' },
        { label: 'Burst Pressure', value: '45 bar' },
        { label: 'Material', value: 'Titanium Grade 5' }
      ],
      visualType: 'cad-model',
      tags: ['Metal 3D Printing', 'DMLS', 'TPMS Geometry', 'nTopology']
    }
  }
];

export const INITIAL_STANDALONE_PROJECTS: ProjectItem[] = [
  // Sketch Art Projects
  {
    id: 'art-sculptural-monoliths',
    title: 'Kinetic Architectural Monolith Studies',
    discipline: 'art',
    summary: 'A series of charcoal, ink, and gouache spatial perspective studies exploring modular interlocking concrete and basalt monuments.',
    description: 'Investigating how architectural mass interacts with sunlight and dynamic shadow. Hand-drafted with architectural leadholders and textured watercolor paper.',
    tags: ['Charcoal', 'Monumental Architecture', 'Perspective', 'Hand Drafting'],
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    highlights: ['24 original charcoal spreads', 'Featured in Modern Industrial Design Exhibit', 'Explores Brutalist geometric proportions']
  },
  {
    id: 'art-ergonomic-scooters',
    title: 'Urban Micro-Mobility Concept Sketches',
    discipline: 'art',
    summary: 'Rapid ideation and digital rendering of foldable electric commuters focusing on rider stance and folded volume.',
    description: 'Explores intuitive folding mechanisms through exploded pen-and-ink diagrams, highlighting quick-latch ergonomics for train commuters.',
    tags: ['Digital Sketching', 'Product Ideation', 'Ergonomics', 'Storyboarding'],
    thumbnail: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&w=800&q=80',
    highlights: ['Folded dimension envelope under 0.08 m³', 'Color-coded ergonomics callouts', 'Rendered in Procreate & Sketchbook']
  },

  // Data Analytics Projects
  {
    id: 'data-wind-turbine-blade',
    title: 'Offshore Wind Blade Telemetry & Fatigue Forecasting',
    discipline: 'data',
    summary: 'Time-series telemetry analysis on 4MW wind turbines to forecast composite spar cap delamination before catastrophic failure.',
    description: 'Built automated anomaly detection pipelines in Python with statistical wave-cycle counting (Rainflow algorithm) and Markov transitions to schedule preventive crane vessel maintenance.',
    tags: ['Time Series', 'Python / SciPy', 'Predictive Maintenance', 'Fatigue Analytics'],
    thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    highlights: ['Cut unscheduled downtime by 31%', 'Processed 1.8B SCADA records', 'Rainflow fatigue life calculation']
  },
  {
    id: 'data-formula-telemetry',
    title: 'Motorsport Lap Time Optimization & Tire Degradation',
    discipline: 'data',
    summary: 'Multi-variable regression models tracking downforce balance, suspension travel, and tire thermal decay over 60-lap race simulations.',
    description: 'Engineered an interactive telemetry dashboard correlating driver throttle input gradients with corner exit velocities to uncover 0.42 seconds of untapped pace per lap.',
    tags: ['Telemetry', 'Regression Modeling', 'Dashboard', 'Kinematics Data'],
    thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
    highlights: ['Correlated 48 live CAN-bus sensors', 'Dynamic tire thermal decay curve', 'Streamlit & Matplotlib visualization']
  },

  // Design Engineering Projects
  {
    id: 'eng-planetary-cycloidal-drive',
    title: 'Zero-Backlash Cycloidal Robotic Actuator',
    discipline: 'engineering',
    summary: 'A high-reduction 45:1 compact cycloidal gearbox engineered for collaborative robotic arms with dual eccentric bearings.',
    description: 'Modeled in SolidWorks with parametric cycloidal disc profile math, needle bearing pin carriers, and grease retention lip seals. Machined in 4140 pre-hardened steel.',
    tags: ['SolidWorks', 'Gear Design', 'Robotics', 'GD&T', 'Machining'],
    thumbnail: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    highlights: ['Torsional backlash < 1.2 arcmin', '180 Nm peak output torque', 'Fully toleranced manufacturing prints']
  },
  {
    id: 'eng-precision-linear-stage',
    title: 'Sub-Micron Piezo Optical Translation Stage',
    discipline: 'engineering',
    summary: 'A precision flexure-guided kinematic stage for laser interferometer alignment with crossed-roller linear guides.',
    description: 'Includes finite element thermal expansion compensation, micrometric differential lead screws, and hard-anodized modular breadboard clamping brackets.',
    tags: ['Opto-Mechanics', 'Flexures', 'FEA', 'Precision Machining'],
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    highlights: ['0.2 micron positioning repeatability', 'Zero stick-slip flexure guidance', 'Invar-36 low CTE inserts']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Art & Visual Ideation',
    discipline: 'art',
    icon: 'Palette',
    description: 'The foundation of human empathy, visual proportion, and rapid aesthetic ideation.',
    skills: [
      { name: 'Concept Hand Drafting', level: 95, highlight: true },
      { name: 'Ergonomic Form Studies', level: 92, highlight: true },
      { name: 'Digital Painting (Procreate)', level: 88 },
      { name: 'Marker & Charcoal Rendering', level: 90 },
      { name: 'Storyboarding & Scenarios', level: 85 },
      { name: 'Color, Material & Finish (CMF)', level: 88, highlight: true }
    ]
  },
  {
    name: 'Data & Empirical Validation',
    discipline: 'data',
    icon: 'LineChart',
    description: 'The bridge verifying mechanical feasibility, structural safety, and data-driven optimization.',
    skills: [
      { name: 'FEA Stress / Modal Simulation', level: 94, highlight: true },
      { name: 'Python (Pandas, SciPy, NumPy)', level: 90, highlight: true },
      { name: 'Computational Fluid Dynamics (CFD)', level: 86 },
      { name: 'Sensor Telemetry & Testing', level: 88, highlight: true },
      { name: 'Statistical Optimization & Regressions', level: 85 },
      { name: 'Data Visualization & Reporting', level: 92 }
    ]
  },
  {
    name: 'Design Engineering & Execution',
    discipline: 'engineering',
    icon: 'Cpu',
    description: 'The physical implementation translating concepts and metrics into manufactured products.',
    skills: [
      { name: 'Parametric CAD (SolidWorks/Fusion)', level: 96, highlight: true },
      { name: 'Design for Manufacturing (DFM/DFA)', level: 92, highlight: true },
      { name: 'GD&T & Tolerance Stackup', level: 90 },
      { name: 'Mechanism & Kinematics Design', level: 94, highlight: true },
      { name: 'Additive Mfg & 5-Axis CNC', level: 88 },
      { name: 'Material Selection & Metallurgy', level: 87 }
    ]
  }
];

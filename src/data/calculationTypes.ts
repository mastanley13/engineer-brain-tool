// Calculation types and their specific calculations

export interface SpecificCalculation {
  id: string;
  title: string;
  description: string;
  formula?: string;
  variables: string[];
}

export const calculationsByCategory = {
  civil: [
    {
      id: "slope-basic",
      title: "Slope (rise/run)",
      description: "Calculate basic slope ratio from vertical rise and horizontal run",
      formula: "Slope = Rise ÷ Run",
      variables: ["rise", "run"]
    },
    {
      id: "grade-percent",
      title: "Grade (%) calculation", 
      description: "Convert slope to percentage grade",
      formula: "Grade% = (Rise ÷ Run) × 100",
      variables: ["rise", "run"]
    },
    {
      id: "slope-angle",
      title: "Angle of slope (degrees/radians)",
      description: "Calculate angle from slope ratio",
      formula: "θ = arctan(Rise ÷ Run)",
      variables: ["rise", "run"]
    },
    {
      id: "horizontal-distance",
      title: "Horizontal distance given slope and rise",
      description: "Find horizontal run from slope and vertical rise",
      formula: "Run = Rise ÷ Slope",
      variables: ["rise", "slope"]
    },
    {
      id: "vertical-rise",
      title: "Vertical rise given slope and run", 
      description: "Find vertical rise from slope and horizontal run",
      formula: "Rise = Slope × Run",
      variables: ["slope", "run"]
    },
    {
      id: "road-slope-correction",
      title: "Road slope correction",
      description: "Correct measurements for road slope",
      variables: ["measured_distance", "slope_angle"]
    },
    {
      id: "cut-fill-volume",
      title: "Cut and fill volume estimation",
      description: "Estimate earthwork volumes",
      variables: ["area", "average_depth", "shrinkage_factor"]
    },
    {
      id: "side-slope-ratio",
      title: "Side slope ratio (H:V)",
      description: "Calculate horizontal to vertical slope ratios",
      formula: "Ratio = Horizontal : Vertical",
      variables: ["horizontal", "vertical"]
    },
    {
      id: "retaining-wall",
      title: "Retaining wall height and angle",
      description: "Calculate retaining wall dimensions",
      variables: ["soil_height", "surcharge_load", "soil_density"]
    },
    {
      id: "runoff-slope",
      title: "Runoff slope for drainage design",
      description: "Calculate minimum slope for proper drainage",
      variables: ["flow_rate", "roughness_coefficient", "cross_section_area"]
    },
    {
      id: "sight-distance",
      title: "Sight distance on slopes",
      description: "Calculate sight distance on sloped roads",
      variables: ["grade", "eye_height", "object_height"]
    },
    {
      id: "elevation-difference",
      title: "Elevation difference between two points",
      description: "Calculate elevation change using coordinates",
      variables: ["x1", "y1", "x2", "y2"]
    },
    {
      id: "earthwork-volume",
      title: "Earthwork volume using cross sections",
      description: "Calculate volume using cross-sectional areas",
      variables: ["area1", "area2", "distance"]
    },
    {
      id: "superelevation",
      title: "Superelevation (banked turns)",
      description: "Calculate banking angle for curves",
      variables: ["design_speed", "radius", "friction_coefficient"]
    },
    {
      id: "ada-compliance",
      title: "Maximum allowable slope for ADA compliance",
      description: "Check ADA slope requirements",
      variables: ["rise", "run", "ramp_type"]
    }
  ],
  
  chemical: [
    {
      id: "ph-concentration",
      title: "pH from H⁺ concentration",
      description: "Calculate pH from hydrogen ion concentration",
      formula: "pH = -log₁₀[H⁺]",
      variables: ["h_concentration"]
    },
    {
      id: "poh-ph-relationship",
      title: "pOH and pH relationship",
      description: "Convert between pH and pOH",
      formula: "pH + pOH = 14 (at 25°C)",
      variables: ["ph_or_poh"]
    },
    {
      id: "strong-acid-ph",
      title: "pH of strong acids/bases",
      description: "Calculate pH for strong acids and bases",
      variables: ["concentration", "acid_or_base"]
    },
    {
      id: "weak-acid-ph", 
      title: "pH of weak acids/bases using Ka/Kb",
      description: "Calculate pH using acid/base dissociation constants",
      formula: "pH = ½(pKa - log[C])",
      variables: ["concentration", "ka_or_kb"]
    },
    {
      id: "henderson-hasselbalch",
      title: "Henderson-Hasselbalch equation",
      description: "Calculate pH of buffer solutions",
      formula: "pH = pKa + log([A⁻]/[HA])",
      variables: ["pka", "conjugate_base_conc", "acid_conc"]
    },
    {
      id: "buffer-calculation",
      title: "Buffer solution calculation",
      description: "Design buffer solutions with target pH",
      variables: ["target_ph", "acid_concentration", "base_concentration"]
    },
    {
      id: "titration-point",
      title: "Titration point determination",
      description: "Calculate equivalence points in titrations",
      variables: ["analyte_conc", "analyte_volume", "titrant_conc"]
    },
    {
      id: "molarity",
      title: "Molarity (mol/L)",
      description: "Calculate molar concentration",
      formula: "M = moles ÷ liters",
      variables: ["moles", "volume_L"]
    },
    {
      id: "normality",
      title: "Normality", 
      description: "Calculate normal concentration",
      formula: "N = equivalents ÷ liters",
      variables: ["equivalents", "volume_L"]
    },
    {
      id: "dilution-equation",
      title: "Dilution equation (C₁V₁ = C₂V₂)",
      description: "Calculate dilution concentrations and volumes",
      formula: "C₁V₁ = C₂V₂",
      variables: ["initial_conc", "initial_vol", "final_conc", "final_vol"]
    },
    {
      id: "stoichiometry",
      title: "Stoichiometry (mole ratios)",
      description: "Calculate quantities from balanced equations",
      variables: ["reactant_moles", "stoichiometric_ratio"]
    },
    {
      id: "limiting-reagent",
      title: "Limiting reagent calculation",
      description: "Determine limiting reactant in chemical reactions",
      variables: ["reactant1_moles", "reactant2_moles", "stoichiometry"]
    },
    {
      id: "mass-percent",
      title: "Mass percent composition",
      description: "Calculate mass percentage of components",
      formula: "Mass% = (component mass ÷ total mass) × 100",
      variables: ["component_mass", "total_mass"]
    },
    {
      id: "heat-reaction",
      title: "Heat of reaction (ΔH)",
      description: "Calculate enthalpy changes in reactions",
      variables: ["bonds_broken", "bonds_formed"]
    },
    {
      id: "chemical-equilibrium",
      title: "Chemical equilibrium (Kc/Kp)",
      description: "Calculate equilibrium constants and concentrations",
      variables: ["product_conc", "reactant_conc", "stoichiometry"]
    }
  ],

  fluid: [
    {
      id: "static-head",
      title: "Static head",
      description: "Calculate static head in fluid systems",
      formula: "h = z (elevation)",
      variables: ["elevation"]
    },
    {
      id: "pressure-head",
      title: "Pressure head (P/ρg)",
      description: "Convert pressure to equivalent head",
      formula: "h = P ÷ (ρ × g)",
      variables: ["pressure", "density", "gravity"]
    },
    {
      id: "total-head",
      title: "Total head = Elevation + Pressure + Velocity head",
      description: "Calculate total hydraulic head",
      formula: "H = z + P/(ρg) + v²/(2g)",
      variables: ["elevation", "pressure", "velocity", "density"]
    },
    {
      id: "bernoulli-equation",
      title: "Bernoulli's Equation",
      description: "Apply Bernoulli's principle for fluid flow",
      formula: "P₁/ρg + v₁²/2g + z₁ = P₂/ρg + v₂²/2g + z₂",
      variables: ["p1", "v1", "z1", "p2", "v2", "z2", "density"]
    },
    {
      id: "flow-rate",
      title: "Flow rate (Q = A × v)",
      description: "Calculate volumetric flow rate",
      formula: "Q = A × v",
      variables: ["area", "velocity"]
    },
    {
      id: "reynolds-number",
      title: "Reynolds number (laminar vs turbulent)",
      description: "Determine flow regime",
      formula: "Re = ρvD/μ",
      variables: ["density", "velocity", "diameter", "viscosity"]
    },
    {
      id: "head-loss-darcy",
      title: "Head loss (Darcy-Weisbach equation)",
      description: "Calculate friction losses in pipes",
      formula: "hf = f × (L/D) × (v²/2g)",
      variables: ["friction_factor", "length", "diameter", "velocity"]
    },
    {
      id: "friction-factor",
      title: "Friction factor (Moody chart)",
      description: "Determine Darcy friction factor",
      variables: ["reynolds_number", "relative_roughness"]
    },
    {
      id: "hagen-poiseuille",
      title: "Hagen–Poiseuille equation",
      description: "Calculate flow in circular pipes (laminar)",
      formula: "Q = (π × D⁴ × ΔP) / (128 × μ × L)",
      variables: ["diameter", "pressure_drop", "viscosity", "length"]
    },
    {
      id: "continuity-equation",
      title: "Continuity equation (A₁V₁ = A₂V₂)",
      description: "Apply conservation of mass",
      formula: "A₁V₁ = A₂V₂",
      variables: ["area1", "velocity1", "area2", "velocity2"]
    },
    {
      id: "pump-power",
      title: "Pump power required",
      description: "Calculate pump power requirements",
      formula: "P = (Q × H × ρ × g) / η",
      variables: ["flow_rate", "head", "density", "efficiency"]
    },
    {
      id: "specific-gravity",
      title: "Specific gravity",
      description: "Calculate specific gravity of fluids",
      formula: "SG = ρ_fluid / ρ_water",
      variables: ["fluid_density", "water_density"]
    },
    {
      id: "hydrostatic-pressure",
      title: "Hydrostatic pressure (ρgh)",
      description: "Calculate pressure due to fluid height",
      formula: "P = ρ × g × h",
      variables: ["density", "gravity", "height"]
    },
    {
      id: "velocity-pressure",
      title: "Velocity from pressure difference",
      description: "Calculate velocity from pressure measurements",
      formula: "v = √(2ΔP/ρ)",
      variables: ["pressure_difference", "density"]
    },
    {
      id: "pipe-diameter",
      title: "Pipe diameter from flow rate",
      description: "Size pipes for required flow rate",
      variables: ["flow_rate", "velocity", "head_loss"]
    }
  ],

  electrical: [
    {
      id: "ohms-law",
      title: "Ohm's Law (V = IR)",
      description: "Calculate voltage, current, or resistance",
      formula: "V = I × R",
      variables: ["voltage", "current", "resistance"]
    },
    {
      id: "power-vi",
      title: "Power (P = VI)",
      description: "Calculate electrical power",
      formula: "P = V × I = I²R = V²/R",
      variables: ["voltage", "current", "resistance"]
    },
    {
      id: "resistance-series",
      title: "Resistance in series",
      description: "Calculate total resistance in series circuits",
      formula: "Rtotal = R₁ + R₂ + R₃ + ...",
      variables: ["resistances"]
    },
    {
      id: "resistance-parallel",
      title: "Resistance in parallel",
      description: "Calculate total resistance in parallel circuits", 
      formula: "1/Rtotal = 1/R₁ + 1/R₂ + 1/R₃ + ...",
      variables: ["resistances"]
    },
    {
      id: "capacitance",
      title: "Capacitance (C = Q/V)",
      description: "Calculate capacitance from charge and voltage",
      formula: "C = Q / V",
      variables: ["charge", "voltage"]
    },
    {
      id: "inductive-reactance",
      title: "Inductive reactance (XL = 2πfL)",
      description: "Calculate inductive reactance",
      formula: "XL = 2π × f × L",
      variables: ["frequency", "inductance"]
    },
    {
      id: "capacitive-reactance",
      title: "Capacitive reactance (XC = 1/2πfC)",
      description: "Calculate capacitive reactance",
      formula: "XC = 1 / (2π × f × C)",
      variables: ["frequency", "capacitance"]
    },
    {
      id: "impedance",
      title: "Impedance (Z)",
      description: "Calculate total impedance in AC circuits",
      formula: "Z = √(R² + (XL - XC)²)",
      variables: ["resistance", "inductive_reactance", "capacitive_reactance"]
    },
    {
      id: "voltage-divider",
      title: "Voltage divider",
      description: "Calculate voltage division in resistor networks",
      formula: "Vout = Vin × (R₂ / (R₁ + R₂))",
      variables: ["input_voltage", "r1", "r2"]
    },
    {
      id: "current-divider",
      title: "Current divider",
      description: "Calculate current division in parallel branches",
      formula: "I₁ = Itotal × (R₂ / (R₁ + R₂))",
      variables: ["total_current", "r1", "r2"]
    },
    {
      id: "ac-rms",
      title: "AC RMS calculations",
      description: "Calculate RMS values for AC signals",
      formula: "Vrms = Vpeak / √2",
      variables: ["peak_voltage", "peak_current"]
    },
    {
      id: "kvl",
      title: "Kirchhoff's Voltage Law (KVL)",
      description: "Apply KVL to circuit analysis",
      variables: ["voltages_around_loop"]
    },
    {
      id: "kcl",
      title: "Kirchhoff's Current Law (KCL)",
      description: "Apply KCL to circuit analysis",
      variables: ["currents_at_node"]
    },
    {
      id: "power-factor",
      title: "Power factor (cos φ)",
      description: "Calculate power factor in AC circuits",
      formula: "PF = cos(φ) = P / S",
      variables: ["real_power", "apparent_power", "phase_angle"]
    },
    {
      id: "energy-consumption",
      title: "Energy consumption (kWh)",
      description: "Calculate electrical energy usage",
      formula: "Energy = Power × Time",
      variables: ["power_kw", "time_hours"]
    }
  ],

  structural: [
    {
      id: "beam-reactions",
      title: "Beam reactions (simply supported, cantilever)",
      description: "Calculate support reactions for beams",
      variables: ["loads", "beam_length", "support_type"]
    },
    {
      id: "shear-moment",
      title: "Shear force and bending moment",
      description: "Calculate shear and moment diagrams",
      variables: ["loads", "beam_length", "position"]
    },
    {
      id: "bending-stress",
      title: "Bending stress (σ = My/I)",
      description: "Calculate bending stress in beams",
      formula: "σ = M × y / I",
      variables: ["moment", "distance_from_neutral", "moment_of_inertia"]
    },
    {
      id: "beam-deflection",
      title: "Deflection of beams",
      description: "Calculate beam deflection under loads",
      variables: ["load", "beam_length", "modulus", "moment_of_inertia"]
    },
    {
      id: "moment-of-inertia",
      title: "Moment of inertia (I)",
      description: "Calculate second moment of area",
      variables: ["cross_section_dimensions"]
    },
    {
      id: "axial-stress",
      title: "Axial stress (σ = F/A)",
      description: "Calculate normal stress from axial loads",
      formula: "σ = F / A",
      variables: ["force", "cross_sectional_area"]
    },
    {
      id: "combined-stress",
      title: "Combined stress (bending + axial)",
      description: "Calculate combined normal stresses",
      formula: "σ = F/A ± My/I",
      variables: ["axial_force", "moment", "area", "section_modulus"]
    },
    {
      id: "truss-analysis",
      title: "Truss member force analysis",
      description: "Calculate forces in truss members",
      variables: ["joint_loads", "member_geometry", "support_conditions"]
    },
    {
      id: "euler-buckling",
      title: "Euler's buckling formula",
      description: "Calculate critical buckling load",
      formula: "Pcr = π²EI / (KL)²",
      variables: ["elastic_modulus", "moment_of_inertia", "length", "k_factor"]
    },
    {
      id: "factor-of-safety",
      title: "Factor of safety",
      description: "Calculate structural safety factors",
      formula: "FS = Ultimate Strength / Working Stress",
      variables: ["ultimate_strength", "working_stress"]
    },
    {
      id: "mohrs-circle",
      title: "Mohr's Circle (stress transformation)",
      description: "Transform stress states using Mohr's circle",
      variables: ["sigma_x", "sigma_y", "tau_xy", "angle"]
    },
    {
      id: "principal-stresses",
      title: "Principal stresses",
      description: "Calculate maximum and minimum normal stresses",
      variables: ["sigma_x", "sigma_y", "tau_xy"]
    },
    {
      id: "torsion",
      title: "Torsion in circular shafts",
      description: "Calculate torsional stress and angle of twist",
      formula: "τ = Tr/J, φ = TL/GJ",
      variables: ["torque", "radius", "length", "shear_modulus"]
    },
    {
      id: "shear-stress-distribution",
      title: "Shear stress distribution",
      description: "Calculate shear stress in beam cross-sections",
      formula: "τ = VQ/It",
      variables: ["shear_force", "first_moment", "moment_of_inertia", "thickness"]
    },
    {
      id: "section-modulus",
      title: "Section modulus",
      description: "Calculate section modulus for bending",
      formula: "S = I / c",
      variables: ["moment_of_inertia", "distance_to_extreme_fiber"]
    }
  ],

  general: [
    {
      id: "unit-conversions",
      title: "Unit conversions (length, mass, volume, pressure, etc.)",
      description: "Convert between different unit systems",
      variables: ["value", "from_unit", "to_unit"]
    },
    {
      id: "algebraic-solver",
      title: "Basic algebraic solver",
      description: "Solve linear and basic algebraic equations",
      variables: ["equation", "variable_to_solve"]
    },
    {
      id: "quadratic-equation",
      title: "Quadratic equation solver",
      description: "Solve quadratic equations ax² + bx + c = 0",
      formula: "x = (-b ± √(b² - 4ac)) / 2a",
      variables: ["a", "b", "c"]
    },
    {
      id: "trigonometric",
      title: "Trigonometric functions (sin, cos, tan)",
      description: "Calculate trigonometric values and inverse functions",
      variables: ["angle", "angle_unit"]
    },
    {
      id: "area-perimeter",
      title: "Area and perimeter (standard shapes)",
      description: "Calculate area and perimeter of geometric shapes",
      variables: ["shape_type", "dimensions"]
    },
    {
      id: "volume-formulas",
      title: "Volume formulas (cube, cylinder, cone, etc.)",
      description: "Calculate volumes of 3D shapes",
      variables: ["shape_type", "dimensions"]
    },
    {
      id: "triangle-solver",
      title: "Triangle solver (SSS, SAS, etc.)",
      description: "Solve triangles using various methods",
      variables: ["known_sides", "known_angles", "solve_method"]
    },
    {
      id: "logarithms",
      title: "Logarithms and exponentials",
      description: "Calculate logarithmic and exponential functions",
      variables: ["base", "argument", "operation_type"]
    },
    {
      id: "statistics",
      title: "Statistical analysis (mean, median, std dev)",
      description: "Calculate basic statistical measures",
      variables: ["data_set"]
    },
    {
      id: "significant-figures",
      title: "Significant figures rounding",
      description: "Round numbers to specified significant figures",
      variables: ["number", "significant_figures"]
    },
    {
      id: "percent-error",
      title: "Percent error calculation",
      description: "Calculate percentage error between values",
      formula: "% Error = |Experimental - Theoretical| / Theoretical × 100",
      variables: ["experimental_value", "theoretical_value"]
    },
    {
      id: "scientific-notation",
      title: "Scientific notation converter",
      description: "Convert between standard and scientific notation",
      variables: ["number", "conversion_direction"]
    },
    {
      id: "matrix-operations",
      title: "Matrix operations (add, multiply, inverse)",
      description: "Perform basic matrix calculations",
      variables: ["matrix_a", "matrix_b", "operation"]
    },
    {
      id: "calculus",
      title: "Derivative and integral calculator",
      description: "Calculate derivatives and integrals",
      variables: ["function", "variable", "operation_type"]
    },
    {
      id: "expression-evaluator",
      title: "Expression evaluator (custom math input)",
      description: "Evaluate custom mathematical expressions",
      variables: ["expression", "variables"]
    }
  ]
};
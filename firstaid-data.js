const firstAidData = {
  en: [
    {
      id: "cpr",
      title: "CPR (Adults)",
      icon: "🫀",
      steps: [
        { text: "Check responsiveness and breathing.", img: "cpstep1.png" },
        { text: "Call emergency services.", img: "cpstep2.png" },
        { text: "Start chest compressions: center of chest, 5–6 cm deep, 100–120/min.", img: "cpstep3.png" },
        { text: "Use AED as soon as available.", img: "cpstep4.png" },
        { text: "Continue cycles until help arrives.", img: "cpstep5.png" }
      ]
    },
    {
      id: "hypothermia",
      title: "Hypothermia / Cold Shock",
      icon: "🥶",
      steps: [
        { text: "Move to warm, dry shelter. Remove wet clothing.", img: "hypstep1.png" },
        { text: "Warm gradually with blankets or body heat.", img: "hypstep2.png" },
        { text: "Do not rub limbs or use direct heat.", img: "hypstep3.png" },
        { text: "Monitor breathing and start CPR if necessary.", img: "hypstep4.png" },
        { text: "Seek medical attention as soon as possible.", img: "hypstep5.png" }
      ]
    },
    {
      id: "bleeding-wound",
      title: "Bleeding & Wound Care",
      icon: "🩹",
      steps: [
        { text: "Wear gloves if available.", img: "bleedstep1.png" },
        { text: "Apply direct pressure with clean cloth or bandage.", img: "bleedstep2.png" },
        { text: "Elevate limb if no fracture suspected.", img: "bleedstep3.png" },
        { text: "If bleeding soaks through, add more layers.", img: "bleedstep4.png" },
        { text: "Clean around wound and cover with sterile dressing.", img: "bleedstep5.png" },
        { text: "Seek medical care if severe.", img: "bleedstep6.png" }
      ]
    },
    {
      id: "fractures",
      title: "Fractures",
      icon: "🦴",
      steps: [
        { text: "Immobilize the injured area.", img: "fracture1.png" },
        { text: "Apply a splint if trained.", img: "fracture2.png" },
        { text: "Apply cold pack to reduce swelling.", img: "fracture3.png" },
        { text: "Control any bleeding.", img: "fracture4.png" },
        { text: "Seek medical attention promptly.", img: "fracture5.png" }
      ]
    },
    {
      id: "sprains",
      title: "Sprains",
      icon: "🦵",
      steps: [
        { text: "Follow R.I.C.E: Rest, Ice, Compression, Elevation.", img: "sprain1.png" },
        { text: "Rest the joint and avoid weight-bearing.", img: "sprain2.png" },
        { text: "Ice 15–20 mins every 2–3 hours.", img: "sprain3.png" },
        { text: "Apply elastic compression bandage.", img: "sprain4.png" },
        { text: "Elevate above heart level.", img: "sprain5.png" },
        { text: "Seek care if severe pain or deformity.", img: "sprain6.png" }
      ]
    },
    {
      id: "near-drowning",
      title: "Near Drowning",
      icon: "🌊",
      steps: [
        { text: "Ensure scene safety. Avoid becoming a victim.", img: "drown1.png" },
        { text: "Call emergency services immediately.", img: "drown2.png" },
        { text: "Check breathing and pulse.", img: "drown3.png" },
        { text: "If not breathing, start rescue breathing.", img: "drown4.png" },
        { text: "If no pulse, begin CPR.", img: "drown5.png" },
        { text: "Keep warm and monitor until help arrives.", img: "drown6.png" }
      ]
    },
    {
      id: "shock",
      title: "Shock",
      icon: "⚡",
      steps: [
        { text: "Lay person on back; elevate legs if no spine injury.", img: "shock1.png" },
        { text: "Keep warm and calm.", img: "shock2.png" },
        { text: "Control any bleeding.", img: "shock3.png" },
        { text: "Do not give food or drink if vomiting or unconscious.", img: "shock4.png" },
        { text: "Call emergency services.", img: "shock5.png" }
      ]
    },
    {
      id: "electrical-shock",
      title: "Electrical Shock",
      icon: "⚡️",
      steps: [
        { text: "Do not touch victim until power is off.", img: "elec1.png" },
        { text: "Turn off source or use non-conductive object to separate.", img: "elec2.png" },
        { text: "Call emergency services.", img: "elec3.png" },
        { text: "Check breathing and pulse.", img: "elec4.png" },
        { text: "Treat burns with cool water; do not apply creams.", img: "elec5.png" }
      ]
    }
  ],

  ne: [
    {
      id: "cpr",
      title: "सीपीआर (वयस्क)",
      icon: "🫀",
      steps: [
        { text: "उत्तर दिन्छ कि र श्वास छ कि जाँच्नुहोस्।", img: "cpstep1.png" },
        { text: "आपतकालीन सेवामा फोन गर्नुहोस्।", img: "cpstep2.png" },
        { text: "छातीको बीचमा ५–६ सेमी गहिरो थिचाइ सुरु गर्नुहोस्, प्रति मिनेट १००–१२०।", img: "cpstep3.png" },
        { text: "AED आयो भने प्रयोग गर्नुहोस्।", img: "cpstep4.png" },
        { text: "सहयोग आउँदासम्म दोहोर्याउनुहोस्।", img: "cpstep5.png" }
      ]
    },
    {
      id: "hypothermia",
      title: "हाइपोथर्मिया / चिसो झड्का",
      icon: "🥶",
      steps: [
        { text: "न्यानो, सुख्खा ठाउँमा लैजानुहोस्। भिजेको लुगा फेर्नुहोस्।", img: "hypstep1.png" },
        { text: "बिस्तारै कम्बल वा शरीरको तापबाट न्यानो बनाउनुहोस्।", img: "hypstep2.png" },
        { text: "जोडजाड नघस्नुहोस् वा सिधा तताउने प्रयोग नगर्नुहोस्।", img: "hypstep3.png" },
        { text: "श्वास निगरानी गर्नुहोस्; आवश्यक परे सीपीआर सुरु गर्नुहोस्।", img: "hypstep4.png" },
        { text: "छिटो चिकित्सा सेवा खोज्नुहोस्।", img: "hypstep5.png" }
      ]
    },
    {
      id: "bleeding-wound",
      title: "रक्तस्राव नियन्त्रण र घाउ हेरचाह",
      icon: "🩹",
      steps: [
        { text: "सम्भव भए पञ्जा लगाउनुहोस्।", img: "bleedstep1.png" },
        { text: "सफा कपडा/ब्यान्डेजले दबाब दिनुहोस्।", img: "bleedstep2.png" },
        { text: "हड्डी भाँचिएको शंका नभए अंग उठाउनुहोस्।", img: "bleedstep3.png" },
        { text: "भिज्यो भने थप तह थप्नुहोस्।", img: "bleedstep4.png" },
        { text: "सफा पानीले वरिपरि सफा गर्नुहोस् र स्टेराइल ड्रेसिङ लगाउनुहोस्।", img: "bleedstep5.png" },
        { text: "गम्भीर भए उपचार खोज्नुहोस्।", img: "bleedstep6.png" }
      ]
    },
    {
      id: "fractures",
      title: "हड्डी भाँचिनु",
      icon: "🦴",
      steps: [
        { text: "घाइते भाग नचलाउनुहोस्।", img: "fracture1.png" },
        { text: "सीप भए स्प्लिन्ट लगाउनुहोस्।", img: "fracture2.png" },
        { text: "कपडाले बेरिएको चिसो सेक दिनुहोस्।", img: "fracture3.png" },
        { text: "रक्तस्राव नियन्त्रण गर्नुहोस्।", img: "fracture4.png" },
        { text: "छिटो चिकित्सा सेवा लिनुहोस्।", img: "fracture5.png" }
      ]
    },
    {
      id: "sprains",
      title: "मांसपेशी捻िनु",
      icon: "🦵",
      steps: [
        { text: "R.I.C.E: विश्राम, बरफ, कम्प्रेसन, उचाल्नु।", img: "sprain1.png" },
        { text: "जोइन्टलाई विश्राम दिनुहोस्; बोझ नदिनुहोस्।", img: "sprain2.png" },
        { text: "पहिलो २४–४८ घण्टा: हरेक २–३ घण्टा १५–२० मिनेट बरफ।", img: "sprain3.png" },
        { text: "इलास्टिक ब्यान्डेजले कम्प्रेसन (अति कसेर होइन)।", img: "sprain4.png" },
        { text: "हृदयभन्दा माथि उचालेर राख्नुहोस्।", img: "sprain5.png" },
        { text: "गम्भीर दुखाइ वा जोइन्ट बिग्रिए उपचार लिनुहोस्।", img: "sprain6.png" }
      ]
    },
    {
      id: "near-drowning",
      title: "झिलमा डुब्न लागेको",
      icon: "🌊",
      steps: [
        { text: "स्थान सुरक्षित छ कि जाँच गर्नुहोस्। आफैं जोखिममा नपर्नुहोस्।", img: "drown1.png" },
        { text: "तुरुन्तै आपतकालीन सेवामा फोन गर्नुहोस्।", img: "drown2.png" },
        { text: "श्वास र नाडी जाँच्नुहोस्।", img: "drown3.png" },
        { text: "श्वास छैन भने बचाउने सास दिनुहोस्।", img: "drown4.png" },
        { text: "नाडी छैन भने सीपीआर सुरु गर्नुहोस्।", img: "drown5.png" },
        { text: "न्यानो राख्नुहोस् र सहयोग आउँदासम्म निगरानी गर्नुहोस्।", img: "drown6.png" }
      ]
    },
    {
      id: "shock",
      title: "शक (Shock)",
      icon: "⚡",
      steps: [
        { text: "ढाड सीधा राखेर लडाउनुहोस्; खुट्टा अलि उठाउनुहोस्।", img: "shock1.png" },
        { text: "न्यानो राख्नुहोस् र ढिला कपडा फुकाल्नुहोस्।", img: "shock2.png" },
        { text: "रक्तस्राव भए नियन्त्रण गर्नुहोस्।", img: "shock3.png" },
        { text: "बान्ता/बेहोस भए खाना-पानी नदिनुहोस्।", img: "shock4.png" },
        { text: "आपतकालीन सेवामा फोन गर्नुहोस्।", img: "shock5.png" }
      ]
    },
    {
      id: "electrical-shock",
      title: "बिद्युत् झटका",
      icon: "⚡️",
      steps: [
        { text: "विद्युत् बन्द नगरी पीडित छोइनुहोस्।", img: "elec1.png" },
        { text: "स्रोत बन्द गर्नुहोस् वा न-बिद्युत् वस्तुले टाढा पार्नुहोस्।", img: "elec2.png" },
        { text: "आपतकालीन सेवामा फोन गर्नुहोस्।", img: "elec3.png" },
        { text: "श्वास/नाडी जाँच्नुहोस्।", img: "elec4.png" },
        { text: "जलन भएको ठाउँ चिसो बहता पानीले चिस्याउनुहोस्।", img: "elec5.png" }
      ]
    }
  ]
};

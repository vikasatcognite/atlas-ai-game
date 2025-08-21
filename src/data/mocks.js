  export const gameFlow = {
    0: {
      botMessage: "Hello! I'm Atlas AI, your industrial operations co-pilot. I can see you're investigating Compressor A108. How can I assist you today?",
      options: [
        { text: "Show me the latest maintenance work orders for Compressor A108", next: 1, isCorrect: true },
        { text: "What's the weather like today?", next: -1, isCorrect: false },
        { text: "Show me all compressors in the plant", next: -2, isCorrect: false }
      ]
    },
    1: {
      botMessage: "📊 **MAINTENANCE WORK ORDERS - COMPRESSOR A108**\n\n• **Last Service:** 2 days ago - Routine inspection\n• **Status:** Operational with minor vibration detected\n• **Next Scheduled:** In 14 days\n• **Recent Issues:** Unusual temperature spikes noted\n\n🔍 **CLUE 1 FOUND:** Compressor showing temperature anomalies!",
      clue: "Temperature anomalies detected in A108",
      options: [
        { text: "Analyze upstream dependencies for A108", next: 2, isCorrect: true },
        { text: "Schedule immediate shutdown", next: -3, isCorrect: false },
        { text: "Check oil levels", next: -4, isCorrect: false }
      ]
    },
    2: {
      botMessage: "🔗 **ASSET HIERARCHY - COMPRESSOR A108**\n\n```\nHeat Exchanger HX-204 → Compressor A108 → Distribution Line D-12\n```\n\n⚠️ **ALERT:** Heat Exchanger HX-204 showing degraded performance\n• **Efficiency:** 73% (Normal: 85-95%)\n• **Fouling detected:** High probability\n• **Impact:** Reduced cooling affecting A108\n\n🔍 **CLUE 2 FOUND:** Heat exchanger fouling is root cause!",
      clue: "HX-204 fouling is causing downstream issues",
      options: [
        { text: "Get recommended actions for this issue", next: 3, isCorrect: true },
        { text: "Restart the compressor immediately", next: -5, isCorrect: false },
        { text: "Check other heat exchangers", next: -6, isCorrect: false }
      ]
    },
    3: {
      botMessage: "🛠️ **RECOMMENDED ACTIONS**\n\n**Immediate Actions:**\n1. **Implement temporary bypass** on HX-204 (Est. time: 2 hours)\n2. **Reduce A108 load** to 70% capacity\n\n**Scheduled Actions:**\n1. **Clean HX-204** during next maintenance window\n2. **Inspect cooling loops** for similar issues\n\n💡 **OPTIMIZATION TIP:** This bypass will maintain operations while preventing compressor damage.\n\n🔍 **CLUE 3 FOUND:** Temporary bypass solution identified!",
      clue: "Bypass HX-204 and reduce A108 load to 70%",
      options: [
        { text: "Execute recommended solution", next: 4, isCorrect: true },
        { text: "Wait for next maintenance window", next: -7, isCorrect: false },
        { text: "Shut down entire system", next: -8, isCorrect: false }
      ]
    },
    4: {
      botMessage: "✅ **SOLUTION EXECUTED SUCCESSFULLY!**\n\n🎉 **Mission Accomplished!** You've successfully:\n• Identified the root cause (heat exchanger fouling)\n• Implemented a safe temporary solution\n• Prevented costly downtime\n• Maintained operational safety\n\nYour quick thinking and effective use of Atlas AI saved the day!",
      options: []
    }
  };

  export const wrongAnswers = {
    '-1': "I'm focused on industrial operations. Let's get back to troubleshooting Compressor A108.",
    '-2': "That's a broad request. Let's focus specifically on A108's recent maintenance history first.",
    '-3': "That's too drastic without proper analysis. Let's understand the upstream dependencies first.",
    '-4': "Oil levels are normal. The issue appears to be temperature-related. Try analyzing upstream systems.",
    '-5': "That could make things worse! We need a systematic approach. What about getting recommendations?",
    '-6': "Let's focus on the immediate issue first. We need actionable recommendations for the current problem.",
    '-7': "That's too slow - the problem needs immediate attention to prevent damage.",
    '-8': "That's excessive and would cause unnecessary downtime. We have better options."
  };
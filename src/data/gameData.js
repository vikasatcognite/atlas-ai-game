export const landingPageOptions = [
  {
    text: "The Reflux Drum (3108-FTN-002) is experiencing a sharp increase in its liquid level, which has triggered high-level alarms. How can we resolve this?",
    prompt: 5,
    equipment: "Reflux Drum"
  },
  {
    text: "The Reflux Pump (3108-PMP-001B) is experiencing a sudden increase in vibration and noise as seen in the time series graph. How can we resolve this?",
    prompt: 3,
    equipment: "Reflux Pump"
  },
  {
    text: "The Regeneration Tower (3108-RT-001) was experiencing poor amine regeneration due to a decreasing temperature trend seen in the time series graph. How can we resolve this?",
    prompt: 2,
    equipment: "Regeneration Tower"
  },
  {
    text: "Pump 3108-PMP-001A has failed due to a temperature spike seen in the time series graph. How can we resolve this?",
    prompt: 1,
    equipment: "Pump 3108-PMP-001A"
  },
  {
    text: "The Reboiler (3108-RB-001) was failing to provide adequate heat to the Regeneration Tower due to a drop in the steam flow rate seen in the time series graph. How can we resolve this?",
    prompt: 4,
    equipment: "Reboiler"
  }
];

export const gameFlow = {
  landing: {
    botMessage: "Welcome to Atlas AI Industrial Operations Assistant. I can see multiple equipment issues requiring immediate attention. Which problem would you like me to help you investigate first?",
    options: landingPageOptions
  },
  
  // Prompt 1 - Pump 3108-PMP-001A Temperature Spike (Active Investigation)
  1: {
    botMessage: "You've observed a temperature spike in Pump 3108-PMP-001A.\n\nThe reason must be one among the five possible parameters only:\n\n1 - Coolant condition\n2 - Current overload\n3 - Motor winding insulation\n4 - Inlet pressure\n5 - Impeller torque / clogging\n\nShall we take a look at the Coolant Condition data?",
    options: [
      { text: "Yes", next: '1-coolant', isCorrect: true },
      { text: "No", next: '1-current', isCorrect: true }
    ]
  },
  '1-coolant': {
    botMessage: "Coolant plays a key role in heat transfer. If coolant is degraded, insufficient, or not replaced on schedule, it can lead to poor cooling and temperature spikes in the pump.\n\n📋 **Check the work order.**\n\nWork order shows coolant was replaced last week and levels are normal.\n\nDo you want to explore Current Overload data further?",
    options: [
      { text: "Yes", next: '1-current', isCorrect: true },
      { text: "No", next: '1-inlet', isCorrect: true }
    ]
  },
  '1-current': {
    botMessage: "Do you want to explore Current Overload data further?",
    options: [
      { text: "Yes", next: '1-current-detail', isCorrect: true },
      { text: "No", next: '1-inlet', isCorrect: true }
    ]
  },
  '1-current-detail': {
    botMessage: "If the motor winding insulation fails, it leads to short circuits and inefficient operation, generating excessive heat.\n\n📋 **Check Work Order**\n\nWork order shows no electrical issues or insulation problems reported.\n\nShall we take a look at the Inlet Pressure data?",
    options: [
      { text: "Yes", next: '1-inlet', isCorrect: true },
      { text: "No", next: '1-impeller', isCorrect: true }
    ]
  },
  '1-inlet': {
    botMessage: "Shall we take a look at the Inlet Pressure data?",
    options: [
      { text: "Yes", next: '1-inlet-detail', isCorrect: true },
      { text: "No", next: '1-impeller', isCorrect: true }
    ]
  },
  '1-inlet-detail': {
    botMessage: "Low inlet pressure can cause cavitation and energy loss, creating abnormal temperature spikes.\n\n📋 **Check Work Order**\n\nWork order shows inlet pressure readings are within normal range.\n\nWould you like me to show you more details on Impeller Torque or Clogging data?",
    options: [
      { text: "Yes", next: '1-impeller-detail', isCorrect: true },
      { text: "No", next: '1-impeller', isCorrect: true }
    ]
  },
  '1-impeller': {
    botMessage: "Would you like me to show you more details on Impeller Torque or Clogging data?",
    options: [
      { text: "Yes", next: '1-impeller-detail', isCorrect: true },
      { text: "No", next: '1-recheck', isCorrect: false }
    ]
  },
  '1-impeller-detail': {
    botMessage: "A clogged impeller increases torque load on the motor, reducing efficiency. This extra load generates heat, causing a temperature spike.\n\n📋 **Check Work Order**\n\nNo mention of impeller inspection or cleaning. This points to impeller clogging as the root cause of the issue.\n\n✅ **Analysis Complete:** The temperature spike is due to impeller clogging causing high torque.",
    options: [
      { text: "I have identified the root cause", next: '1-solution', isCorrect: true },
      { text: "I have not identified the root cause", next: '1-recheck', isCorrect: false }
    ]
  },
  '1-solution': {
    botMessage: "🎯 **Root Cause Identified:** Impeller clogging causing high torque and temperature spike.\n\nDo you require a recommended corrective action?",
    options: [
      { text: "Yes", next: '1-corrective', isCorrect: true },
      { text: "No", next: 'landing', isCorrect: true }
    ]
  },
  '1-corrective': {
    botMessage: "✅ **Recommended Corrective Action:** Inspect and clean the impeller to restore normal operation.\n\n🏆 **Analysis Complete!** You have successfully identified the root cause and corrective action.",
    rootCause: "Impeller clogging in Pump 3108-PMP-001A",
    solution: "Inspect and clean the impeller",
    options: [
      { text: "Submit complete report", next: 'complete', isCorrect: true }
    ]
  },

  // Prompt 2 - Regeneration Tower (Already Resolved)
  2: {
    botMessage: "Based on the data and maintenance logs, the issue with the Regeneration Tower (3108-RT-001) has been resolved.\n\n🔍 **Root Cause:** Steam Trap Failure on the reboiler. A faulty steam trap caused condensate to build up inside the reboiler, reducing the surface area available for heat transfer and leading to the decreasing temperature trend.\n\n✅ **Resolution:** The steam trap was replaced, and the tower is now operating normally.\n\nDo you want to explore other possible causes?",
    options: [
      { text: "Yes", next: 'landing', isCorrect: true },
      { text: "No action required", next: 'landing', isCorrect: true }
    ]
  },

  // Prompt 3 - Reflux Pump (Already Resolved)
  3: {
    botMessage: "Based on the data, the issue with the Reflux Pump (3108-PMP-001B) has been resolved.\n\n🔍 **Root Cause:** Cavitation due to a low liquid level in the Reflux Drum. This created vapor bubbles at the pump's inlet, which collapsed violently and caused the high vibration and noise.\n\n✅ **Resolution:** Liquid level in Reflux Drum has been restored to normal operating range.\n\nDo you want to explore other possible causes?",
    options: [
      { text: "Yes", next: 'landing', isCorrect: true },
      { text: "No action required", next: 'landing', isCorrect: true }
    ]
  },

  // Prompt 4 - Reboiler (Already Resolved)
  4: {
    botMessage: "The issue with the Reboiler (3108-RB-001) has been resolved.\n\n🔍 **Root Cause:** Data from the last maintenance cycle confirms that the root cause was a faulty steam control valve on the steam supply line. It was found to be partially closed, causing the drop in steam flow rate.\n\n✅ **Resolution:** The valve was recalibrated and fixed, restoring the correct steam flow. As a result, the reboiler is now providing adequate heat, and the Regeneration Tower is operating normally.\n\nDo you want to explore other possible causes?",
    options: [
      { text: "Yes", next: 'landing', isCorrect: true },
      { text: "No action required", next: 'landing', isCorrect: true }
    ]
  },

  // Prompt 5 - Reflux Drum (Already Resolved)
  5: {
    botMessage: "Based on the data and maintenance logs, the issue with the Reflux Drum (3108-FTN-002) has been resolved.\n\n🔍 **Root Cause:** A faulty level control valve on the reflux line, which had failed in the closed position, preventing liquid from draining from the drum. This caused the liquid level to rise uncontrollably, triggering the alarms.\n\n✅ **Resolution:** Level control valve has been repaired and is functioning normally.\n\nDo you want to explore other possible causes?",
    options: [
      { text: "Yes", next: 'landing', isCorrect: true },
      { text: "No action required", next: 'landing', isCorrect: true }
    ]
  },

  '1-recheck': {
    botMessage: "Let's review the work order again more carefully. All parameters except impeller condition have been verified as normal.",
    options: [
      { text: "Check Impeller details again", next: '1-impeller-detail', isCorrect: true }
    ]
  },

  // Game completion step
  complete: {
    botMessage: "🎉 **Investigation Complete!**\n\nCongratulations! You have successfully completed the root cause analysis and provided corrective actions for Pump 3108-PMP-001A.\n\n🏆 **Well Done!**\n\nYou have:\n- Identified the correct root cause: Impeller clogging\n- Provided the appropriate corrective action: Inspect and clean the impeller\n- Followed proper troubleshooting methodology\n\n💰 **Reward:** Your team is awarded 3 coins for being the first to submit a complete and accurate report!\n\nYour investigation report has been successfully submitted.",
    isGameComplete: true,
    options: []
  }
};

(function eventFieldMappingScript(eventGr, origEventSysId, fieldMappingRuleName) {
	// Make any changes to the alert which will be created out of this Event
	// Note that the Event itself is immutable, and will not be changed in the database.
	// You can set the values on the eventGr, e.g. eventGr.setValue(...), but don't perform an update with eventGr.update().
	// To abort the changes in the event record, return false;
	// Returning a value other than boolean will result in an error
	try {
		var addInfo = JSON.parse(eventGr.getValue("additional_info"));
		if (addInfo.hasOwnProperty("CustomField1")) {
			var customFieldValues = addInfo["CustomField1"].split(" ");
			addInfo.ars_esc = customFieldValues[0].trim() === "escalate" ? "Yes" : "No";
			addInfo.ars_delay_time = customFieldValues[2].trim();
			eventGr.setValue("additional_info", JSON.stringify(addInfo));
			switch (customFieldValues[1].trim()) {
				case "Low":
					eventGr.setValue("severity", 4);
					break;
				case "Medium":
					eventGr.setValue("severity", 3);
					break;
				case "High":
					eventGr.setValue("severity", 2);
					break;
				case "Critical":
					eventGr.setValue("severity", 1);
					break;
			}
		}
		return true;
	} catch (e) {
		gs.error(" The script type mapping rule '" + fieldMappingRuleName + "' ran with the error: \n" + e);
	}
})(eventGr, origEventSysId, fieldMappingRuleName);

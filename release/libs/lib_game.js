var v_lib_game_manifest = function(v_libRegData) {
	C$common$registerLibraryFunction('game', v_libRegData, "clock_tick", 0);
	C$common$registerLibraryFunction('game', v_libRegData, "getScreenInfo", 1);
	C$common$registerLibraryFunction('game', v_libRegData, "initialize", 1);
	C$common$registerLibraryFunction('game', v_libRegData, "initialize_screen", 4);
	C$common$registerLibraryFunction('game', v_libRegData, "pump_events", 1);
	C$common$registerLibraryFunction('game', v_libRegData, "set_title", 1);
};


var v_lib_game_function_clock_tick = function(v_args) {
	C$game$endFrame();
	v_vm_suspend();
	return v_VALUE_NULL;
};


var v_lib_game_function_getScreenInfo = function(v_args) {
	var v_outList = v_args[0];
	var v_o = C$common$intBuffer16;
	if (C$game$screenInfo(v_o)) {
		var v_output = v_outList[1];
		v_output[0] = v_buildBoolean((v_o[0] == 1));
		v_output[1] = v_buildInteger(v_o[1]);
		v_output[2] = v_buildInteger(v_o[2]);
	}
	return v_outList;
};


var v_lib_game_function_initialize = function(v_args) {
	C$game$initializeGame(v_getFloat(v_args[0]));
	return v_VALUE_NULL;
};


var v_lib_game_function_initialize_screen = function(v_args) {
	var v_ec = v_getExecutionContext(v_vm_getCurrentExecutionContextId());
	C$game$initializeScreen(v_args[0][1], v_args[1][1], v_args[2][1], v_args[3][1], v_vm_getCurrentExecutionContextId());
	v_vm_suspend_for_context(v_ec);
	return v_VALUE_NULL;
};


var v_lib_game_function_pump_events = function(v_args) {
	v_libGamePumpEvents(v_args[0][1]);
	return v_args[0];
};


var v_lib_game_function_set_title = function(v_args) {
	C$game$setTitle(v_args[0][1]);
	return v_VALUE_NULL;
};


var v_libGamePumpEvents = function(v_output) {
	var v_eventList = C$game$pumpEventObjects();
	C$common$clearList(v_output);
	var v_len = v_eventList.length;
	if ((v_len > 0)) {
		var v_i = 0;
		v_i = 0;
		while ((v_i < v_len)) {
			var v_ev = v_eventList[v_i];
			v_output.push(v_buildInteger(v_ev[0]));
			var v_t = v_ev[0];
			v_output.push(v_buildInteger(v_ev[1]));
			if ((v_t >= 32)) {
				v_output.push(v_buildInteger(v_ev[2]));
				if ((v_t == 37)) {
					v_output.push(v_buildFloat(v_ev[4]));
				}
			}
			v_i += 1;
		}
	}
	return 0;
};


C$common$scrapeLibFuncNames('game');

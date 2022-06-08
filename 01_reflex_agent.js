// MIT License
// 200117439

function reflex_agent(location, state) {
  if (state == "DIRTY") return "CLEAN";
  else if (location == "A") return "RIGHT";
  else if (location == "B") return "LEFT";
}

function estadoVisitado() {
  if (states[0] == "A" && states[1] == "DIRTY" && states[2] == "CLEAN") {
    visitados[0] = true;
  } else if (states[0] == "B" && states[1] == "DIRTY" && states[2] == "DIRTY") {
    visitados[1] = true;
  } else if (states[0] == "B" && states[1] == "DIRTY" && states[2] == "CLEAN") {
    visitados[2] = true;
  }
}

function Dirty() {
  if (states[1] == "CLEAN" && states[2] == "CLEAN") {
    var aleatorio = Math.floor(Math.random() * (4 - 1)) + 1;

    if (aleatorio == 1) {
      states[1] = "DIRTY";
    } else if (aleatorio == 2) {
      states[2] = "DIRTY";
    } else if (aleatorio == 3) {
      states[1] = "DIRTY";
      states[2] = "DIRTY";
    }
  }
}

function test(states) {
  estadoVisitado();
  var location = states[0];
  var state = "";
  if (states[0] == "A") {
    state = states[1];
  } else {
    state = states[2];
  }
  var action_result = reflex_agent(location, state);
  document.getElementById("log").innerHTML += "<br>Location: "
    .concat(location)
    .concat(
      " [A: " +
        states[1] +
        "] [B: " +
        states[2] +
        "]" +
        " [Action: " +
        action_result +
        "]"
    );
  Dirty();
  if (action_result == "CLEAN") {
    if (location == "A") {
      states[1] = "CLEAN";
    } else if (location == "B") {
      states[2] = "CLEAN";
    }
  } else if (action_result == "RIGHT") {
    states[0] = "B";
  } else if (action_result == "LEFT") {
    states[0] = "A";
  }

  if (visitados[0] == false || visitados[1] == false || visitados[2] == false) {
    setTimeout(function () {
      test(states);
    }, 2000);
  } else {
    document.getElementById("log").innerHTML += "<br>Estados completos";
  }
}

var visitados = [false, false, false];
var states = ["A", "DIRTY", "DIRTY"];
test(states);

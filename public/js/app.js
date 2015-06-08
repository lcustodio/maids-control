var React = require('react');

var MaidControlApp = require('./components/MaidControlApp.react');
var InstructionSection = require('./components/InstructionSection.react');

React.render(
  	<MaidControlApp />,
  	document.getElementById('maidscontrol')
);

React.render(
  	<InstructionSection />,
  	document.getElementById('instructions')
);
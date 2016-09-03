# TODOS

- implement of first version of the visualization for burst

- create a alternative checkin service creating groups based on os
- define if the server could a firefly -> allow to have a idea of the "current time"
- add controls on synths

- record cymbale antique, bol chantant, clochette japonaise

- harmonic progression 

- define an architecture to separate input / composition / synth / visualization

  
- make a scheme of the overall system
  user input, system evolution, composition, rendering (audio, visual)
  -> define all the possible feedbacks
  -> define what could be the architecture of such a system


- create a mapping abstraction (linear, exp, etc...)
  push / pull
  nbr of inputs


- sketch automations on shared-parameters
  -> should minimize network overhead
  -> paramId, from=currentValue, to, time, updateRate, 'linear'|'exponential'
  -> paramId, from=currentValue, to, targetTime, updateRate, 'linear'|'exponential'

- how to configure the rules, globals of the system

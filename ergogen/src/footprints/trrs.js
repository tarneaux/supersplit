// TRRS-PJ-320A-dual
//     _________________
//    |   (2)   (3) (4)|
//    |                |
//    |_(1)____________|
//
// Nets
//    A: corresponds to pin 1 (sleeve)
//    B: corresponds to pin 2 (outer ring)
//    C: corresponds to pin 3 (inner ring)
//    D: corresponds to pin 4 (tip)
//    Please note that this naming might not correspond to what is used in other boards; namely crkbd
// Params
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible
//    symmetric: default is false
//      if true, will only work if reverse is also true
//      this will cause the footprint to be symmetrical on each half
//      pins 1 and 2 must be identical if symmetric is true, as they will overlap

module.exports = {
  nets: {
    A: undefined,
    B: undefined,
    C: undefined,
    D: undefined
  },
  params: {
    class: 'TRRS',
    reverse: false,
    symmetric: false
  },
  body: p => {
    const standard = `
      (module TRRS-PJ-320A-dual (layer F.Cu) (tedit 5970F8E5)

      ${p.at /* parametric position */}   

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 14.2) (layer Dwgs.User) (effects (font (size 1 1) (thickness 0.15))))
      (fp_text value TRRS-PJ-320A-dual (at 0 -5.6) (layer F.Fab) (effects (font (size 1 1) (thickness 0.15))))

      ${''/* corner marks */}
      (fp_line (start 0.5 -2) (end -5.1 -2) (layer Dwgs.User) (width 0.15))
      (fp_line (start -5.1 0) (end -5.1 -2) (layer Dwgs.User) (width 0.15))
      (fp_line (start 0.5 0) (end 0.5 -2) (layer Dwgs.User) (width 0.15))
      (fp_line (start -5.35 0) (end -5.35 12.1) (layer Dwgs.User) (width 0.15))
      (fp_line (start 0.75 0) (end 0.75 12.1) (layer Dwgs.User) (width 0.15))
      (fp_line (start 0.75 12.1) (end -5.35 12.1) (layer Dwgs.User) (width 0.15))
      (fp_line (start 0.75 0) (end -5.35 0) (layer Dwgs.User) (width 0.15))

      ${''/* stabilizers */}
      (pad "" np_thru_hole circle (at -2.3 8.6) (size 1.2 1.2) (drill 1.2) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at -2.3 1.6) (size 1.2 1.2) (drill 1.2) (layers *.Cu *.Mask))
      `
    function pins(def_neg, def_pos) {
      return `
        (pad 1 thru_hole oval (at ${def_neg} 11.3 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.net.A.str})
        (pad 2 thru_hole oval (at ${def_pos} 10.2 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.net.B.str})
        (pad 3 thru_hole oval (at ${def_pos} 6.2 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.net.C.str})
        (pad 4 thru_hole oval (at ${def_pos} 3.2 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.net.D.str})
      `
    }
    if(p.param.reverse & p.param.symmetric) {
      return `
        ${standard}
        ${pins('0', '-4.6')}
        ${pins('-4.6', '0')})
      `
    } else if(p.param.reverse) {
        return `
          ${standard}
          ${pins('0', '-4.6')})
        `
      } else {
        return `
          ${standard}
          ${pins('-4.6', '0')})
        `
      }
  }
}

import { HefilInflection } from "../Actions/TextFormats/InflectionFormats/HefilInflection";
import { HitpaelInflection } from "../Actions/TextFormats/InflectionFormats/HitpaelInflection";
import { NifalInflection } from "../Actions/TextFormats/InflectionFormats/NifalInflection";
import { PaalInflection } from "../Actions/TextFormats/InflectionFormats/PaalInflection";
import { PielInflection } from "../Actions/TextFormats/InflectionFormats/PielInflection";

const VERB_TYPES = {
    A: PaalInflection,
    B: NifalInflection,
    C: PielInflection,
    E: HitpaelInflection,
    F: HefilInflection,
};

export default VERB_TYPES;
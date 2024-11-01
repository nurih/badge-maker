const DEFAULT_FRAME = "pass-badge.png";

const BADGEMAKER_FRAME_URI: string = import.meta.env.VITE_BADGEMAKER_FRAME_URI || DEFAULT_FRAME;

export default BADGEMAKER_FRAME_URI;
import BlotIcon from "../assets/icons/blot.svg?react";
import FingerPrintIcon from "../assets/icons/finger-print.svg?react";
import CameraIcon from "../assets/icons/camera.svg?react";

export default function FeaturesIcon({ name, className }) {
  const Icon = ICON_MAP[name];

  if (!Icon) return null;

  return <Icon className={className} aria-hidden="true" />;
}
const ICON_MAP = {
  blot: BlotIcon,
  fingerprint: FingerPrintIcon,
  camera: CameraIcon,
};

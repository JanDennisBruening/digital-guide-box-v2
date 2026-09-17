import React from 'react';
import {
  MessageCircle,
  UserRound,
  Mail,
  Globe,
  Wifi,
  RefreshCw,
  KeyRound,
  ShieldCheck,
  Image as ImageIcon,
  QrCode,
  Camera,
  Type,
  ContactRound,
  Download,
  MapPin,
  Bluetooth,
  ScanLine,
  Languages,
  CalendarDays,
  AlarmClock,
  FolderOpen,
  Paperclip,
  Archive,
  Video,
  Bookmark,
  Bell,
  Share2,
  ListChecks,
  MousePointer2,
  Monitor,
  Smartphone,
  BookOpen,
  Send,
  Search,
  UserPlus,
  Link,
  Settings,
  CircleCheck,
  Save,
  ShieldAlert,
  CloudUpload,
  HardDrive,
  FileCheck,
  ArrowUpRight,
  SlidersHorizontal,
  Phone,
  Footprints,
  Route,
  Volume2,
  CalendarPlus,
  Clock3,
  FileSearch,
  FileText,
  Inbox,
  Mic,
  Eye,
  Plus,
  Lightbulb,
  LogOut,
  LucideIcon
} from 'lucide-react';
import { Guide } from '../types';
import { getGuideStyles } from '../data/themes';

export const GUIDE_ICONS: Record<string, LucideIcon> = {
  'whatsapp': MessageCircle,
  'google-konto': UserRound,
  'gmail': Mail,
  'webbrowser': Globe,
  'wlan': Wifi,
  'updates': RefreshCw,
  'passwoerter': KeyRound,
  'betrugsnachrichten': ShieldCheck,
  'fotos-sichern': ImageIcon,
  'qr-codes': QrCode,
  'screenshots': Camera,
  'schriftgroesse': Type,
  'kontakte': ContactRound,
  'apps-installieren': Download,
  'google-maps': MapPin,
  'bluetooth': Bluetooth,
  'dokumente-scannen': ScanLine,
  'uebersetzen': Languages,
  'kalender': CalendarDays,
  'wecker': AlarmClock,
  'downloads': FolderOpen,
  'gmail-anhaenge': Paperclip,
  'gmail-ordnen': Archive,
  'google-meet': Video,
  'konto-wiederherstellen': KeyRound,
  'lesezeichen': Bookmark,
  'benachrichtigungen': Bell,
  'app-berechtigungen': ShieldCheck,
  'dateien-teilen': Share2,
  'listen': ListChecks,
  'app-grundlagen': MousePointer2,
  'betriebssystem': Monitor,
  'ios-android': Smartphone,
  'internet-grundlagen': Wifi,
  'benutzerkonto': UserRound
};

export const STEP_ICONS: Record<string, LucideIcon[]> = {
  'whatsapp': [ContactRound, Send, Paperclip, MessageCircle],
  'google-konto': [Search, UserPlus, KeyRound, ShieldCheck],
  'gmail': [Mail, Type, Paperclip, Send],
  'webbrowser': [Globe, Link, Search, FolderOpen],
  'wlan': [Wifi, Settings, KeyRound, CircleCheck],
  'updates': [Smartphone, Settings, Settings, RefreshCw],
  'passwoerter': [KeyRound, ShieldCheck, Save, ShieldCheck],
  'betrugsnachrichten': [ShieldAlert, Search, MessageCircle, ShieldCheck],
  'fotos-sichern': [UserRound, CloudUpload, HardDrive, FileCheck],
  'qr-codes': [Camera, QrCode, Search, ArrowUpRight],
  'screenshots': [Smartphone, Camera, ImageIcon, Send],
  'schriftgroesse': [Settings, Type, SlidersHorizontal, CircleCheck],
  'kontakte': [ContactRound, UserPlus, Phone, Save],
  'apps-installieren': [Download, Search, FileCheck, CircleCheck],
  'google-maps': [Search, MapPin, Footprints, Route],
  'bluetooth': [Bluetooth, Settings, Search, CircleCheck],
  'dokumente-scannen': [Camera, ScanLine, FileCheck, Save],
  'uebersetzen': [Languages, Type, Search, Volume2],
  'kalender': [CalendarPlus, Type, Clock3, Save],
  'wecker': [AlarmClock, Clock3, Volume2, CircleCheck],
  'downloads': [FolderOpen, Download, FileSearch, FileText],
  'gmail-anhaenge': [Mail, Paperclip, FileCheck, Send],
  'gmail-ordnen': [Mail, Archive, Search, Inbox],
  'google-meet': [Link, Video, UserRound, Mic],
  'konto-wiederherstellen': [Globe, UserRound, ShieldCheck, KeyRound],
  'lesezeichen': [Globe, Bookmark, FolderOpen, MousePointer2],
  'benachrichtigungen': [Settings, Bell, SlidersHorizontal, CircleCheck],
  'app-berechtigungen': [Settings, ShieldCheck, SlidersHorizontal, CircleCheck],
  'dateien-teilen': [FolderOpen, UserPlus, Eye, Share2],
  'listen': [ListChecks, Plus, Type, CircleCheck],
  'app-grundlagen': [Lightbulb, MousePointer2, Globe, Download],
  'betriebssystem': [Monitor, Smartphone, Search, RefreshCw],
  'ios-android': [Smartphone, MessageCircle, Search, Send],
  'internet-grundlagen': [Globe, Wifi, Share2, ShieldAlert],
  'benutzerkonto': [UserRound, KeyRound, UserPlus, LogOut]
};

export function getGuideIcon(guideId: string): LucideIcon {
  return GUIDE_ICONS[guideId] || BookOpen;
}

export function getStepIcon(guideId: string, stepIndex: number): LucideIcon {
  const list = STEP_ICONS[guideId];
  if (list && list[stepIndex]) {
    return list[stepIndex];
  }
  return CircleCheck;
}

interface GuideIconProps {
  guide: Guide;
  className?: string;
}

export const GuideIcon: React.FC<GuideIconProps> = ({ guide, className = '' }) => {
  const Icon = getGuideIcon(guide.id);
  return (
    <span
      className={`app-icon ${className}`}
      aria-hidden="true"
      style={getGuideStyles(guide.theme)}
    >
      <Icon />
    </span>
  );
};

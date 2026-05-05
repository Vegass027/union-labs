import VSCodeHeader from "@/components/landing/VSCodeHeader"
import ManagerPainBlock from "@/components/landing/manager/ManagerPainBlock"
import ManagerScaleBlock from "@/components/landing/manager/ManagerScaleBlock"
import ManagerFrameBlock from "@/components/landing/manager/ManagerFrameBlock"
import ManagerStepsBlock from "@/components/landing/manager/ManagerStepsBlock"
import ManagerObjectionsBlock from "@/components/landing/manager/ManagerObjectionsBlock"
import ManagerSocialBlock from "@/components/landing/manager/ManagerSocialBlock"
import ManagerMoneyBlock from "@/components/landing/manager/ManagerMoneyBlock"
import ManagerInfraBlock from "@/components/landing/manager/ManagerInfraBlock"
import ManagerCTABlock from "@/components/landing/manager/ManagerCTABlock"

export const metadata = {
  title: "Зарабатывай с Union Labs — Партнёрская программа",
  description: "Приводи клиентов и получай 30% с каждого проекта. Без холодных звонков, без технических знаний.",
}

const managerTabs = [
  { id: "m-pain", label: "проблема", icon: "🔴" },
  { id: "m-scale", label: "масштаб", icon: "📊" },
  { id: "m-frame", label: "мышление", icon: "💡" },
  { id: "m-steps", label: "пайплайн", icon: "🤖" },
  { id: "m-faq", label: "вопросы", icon: "💬" },
  { id: "m-social", label: "отзывы", icon: "⭐" },
  { id: "m-money", label: "калькулятор", icon: "💰" },
  { id: "m-infra", label: "возможности", icon: "🧑‍💻" },
  { id: "m-cta", label: "старт", icon: "⚡" },
]

export default function EarnPage() {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(155 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(155 100% 50%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <VSCodeHeader tabs={managerTabs} defaultActiveTab="m-pain" />

      <div className="pt-20">
        <div id="m-pain"><ManagerPainBlock /></div>
        <div id="m-scale"><ManagerScaleBlock /></div>
        <div id="m-frame"><ManagerFrameBlock /></div>
        <div id="m-steps"><ManagerStepsBlock /></div>
        <div id="m-faq"><ManagerObjectionsBlock /></div>
        <div id="m-social"><ManagerSocialBlock /></div>
        <div id="m-money"><ManagerMoneyBlock /></div>
        <div id="m-infra"><ManagerInfraBlock /></div>
        <div id="m-cta"><ManagerCTABlock /></div>
      </div>
    </main>
  )
}

/**
 * Application Sidebar Component
 * 
 * Provides navigation between main views:
 * - Website Test
 * - Security Report
 * - Cybersecurity Terms
 * - Export PDF Report
 */

import { 
  Shield, 
  Search, 
  FileText, 
  BookOpen, 
  Download,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ViewType = 'test' | 'report' | 'terms' | 'export';

interface AppSidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  hasReport: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { id: 'test' as ViewType, label: 'Website Test', icon: Search },
  { id: 'report' as ViewType, label: 'Security Report', icon: FileText },
  { id: 'terms' as ViewType, label: 'Cybersecurity Terms', icon: BookOpen },
  { id: 'export' as ViewType, label: 'Export PDF Report', icon: Download },
];

const AppSidebar = ({ 
  currentView, 
  onViewChange, 
  hasReport,
  isCollapsed,
  onToggleCollapse
}: AppSidebarProps) => {
  return (
    <aside 
      className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleCollapse}
            className="flex-shrink-0"
          >
            <Menu className="h-5 w-5" />
          </Button>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-sidebar-primary" />
              <span className="font-bold text-lg text-sidebar-foreground">
                SecureCheck
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isDisabled = (item.id === 'report' || item.id === 'export') && !hasReport;
          const isActive = currentView === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 transition-all",
                isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                isDisabled && "opacity-50 cursor-not-allowed",
                isCollapsed && "justify-center px-2"
              )}
              onClick={() => !isDisabled && onViewChange(item.id)}
              disabled={isDisabled}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={cn("h-5 w-5 flex-shrink-0", isCollapsed && "mx-auto")} />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground text-center">
            University Course Project
          </p>
          <p className="text-xs text-muted-foreground text-center mt-1">
            Information Security Management
          </p>
        </div>
      )}
    </aside>
  );
};

export default AppSidebar;

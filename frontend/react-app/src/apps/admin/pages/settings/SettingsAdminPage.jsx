
import { SettingsAdminSidebar } from "./";

export const SettingsAdminPage = () => {

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Page header */}
      <div className="mb-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl text-slate-700 font-bold">Admin Settings</h1>
      </div>

      {/* Content */}
      <div className="bg-white shadow-lg rounded-sm mb-8">
        <div className="flex flex-col md:flex-row md:-mr-px">
          <SettingsAdminSidebar/>
        </div>
      </div>

    </div>
  )
};
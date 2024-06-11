import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import React from "react";

const CrateVacancyForm = () => {
  return (
    <main className="w-full h-full flex flex-col">
      <section className="w-full flex justify-between">
        <h1 className="text-xl font-semibold tracking-wider">Create Vacancy</h1>
        <div className="flex gap-4">
          <Button className="bg-red-300 text-red-700 border border-red-900">
            Cancel
          </Button>
          <Button className="bg-blue-600 text-white border border-blue-900">
            <Save size={13} />
            Save
          </Button>
        </div>
      </section>
      <section>
        <div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
      </section>
    </main>
  );
};

export default CrateVacancyForm;

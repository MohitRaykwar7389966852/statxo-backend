import Iframe from "react-iframe";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function CategoryTree() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Iframe
        url="https://apps.powerapps.com/play/13625f4d-ea2b-4883-bc8c-8834e0ecee5c?tenantId=55e0a09f-7836-4d37-b386-b5605b46a125"
        width="97%"
        height="620px"
        display="block"
        position="relative"
        allowFullScreen
      />
    </DashboardLayout>
  );
}

export default CategoryTree;

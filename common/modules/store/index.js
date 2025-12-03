import { create } from "zustand";
import { find, filter } from "lodash";
import { useEffect } from "react"; // Import useEffect
import { fetchBannersData } from "@/pages/api";
import { useRouter } from "next/router";

export const useBanner = create((set) => ({
  stepc:  1,
  frontPageHorizontal: {},
  bigVerticalLitePurple: {},
  bigVerticalPink: {},
  tourListBanners: [],
  authToken:  null,
  selectedLanguageCode: "en", // Default language code

  // Method to set the authToken
  setAuthToken: (token) => set({ authToken: token }),

  // Method to clear the authToken
  clearAuthToken: () => set({ authToken: null }),

  fetchBanner: async () => {
    let userAgent = 'userAgent';
    let deviceId = 'deviceId';

    try {
      const router = useRouter();
      const selectedLanguageCode = router.query.lang || 'en';

      const BannerData = await fetchBannersData({ selectedLanguageCode, userAgent, deviceId });

      console.log("BannerData", BannerData);
      // Update state with fetched data
      set({ frontPageHorizontal: find(BannerData.data, banner => banner.id === 1) });
      set({ bigVerticalLitePurple: find(BannerData.data, banner => banner.id === 2) });
      set({ bigVerticalPink: find(BannerData.data, banner => banner.id === 3) });
      set({ tourListBanners: filter(BannerData.data, banner => banner.id >= 4) });

    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error here, e.g., show an error message to the user.
    }
  }
}));

// Wrap your component with useEffect to fetch data when it mounts
export function banners() {
  const { fetchBanner } = useBanner();

  useEffect(() => {
    fetchBanner(); // Fetch data when the component mounts
    console.log("fetchBanner", fetchBanner())
  }, []); // Empty dependency array to run the effect only once

  // Rest of your component code
}

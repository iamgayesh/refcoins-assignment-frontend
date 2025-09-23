"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUser } from "../../redux/slices/authSlice";
import CommonButton from "../ui/CommonButton";
import CommonModal from "../ui/CommonModal";
import AddPropertyForm from "../ui/AddPropertyForm";

export default function MainHeader() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

  console.log("MainHeader - isAuthenticated:", isAuthenticated);
  console.log("MainHeader - user:", user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleAddPropertyClick = () => {
    console.log("Add Property button clicked!");
    console.log("Current showAddPropertyModal state:", showAddPropertyModal);
    setShowAddPropertyModal(true);
    console.log("Modal should now be visible");
  };

  const handleCloseModal = () => {
    setShowAddPropertyModal(false);
  };

  const handlePropertyCreated = () => {
    // Optional: Show success message or perform additional actions
    console.log("Property created successfully!");
  };

  return (
    <header className="bg-background text-foreground shadow-md sticky top-0 z-50 transition-colors">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center flex-wrap gap-y-2">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          PropertyApp
        </Link>

        {/* Navigation + Auth */}
        <div className="flex items-center gap-4 sm:gap-6">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600 hidden sm:block">
                Welcome, {user.username} ({user.userType})
              </span>
              <Link href="/dashboard">
                <CommonButton label="Dashboard" variant="secondary" />
              </Link>
              <CommonButton
                label="Add Property"
                variant="primary"
                onClick={handleAddPropertyClick}
              />
              <CommonButton
                label="Logout"
                variant="primary"
                onClick={handleLogout}
              />
            </>
          ) : (
            <Link href="/login">
              <CommonButton label="Login" variant="primary" />
            </Link>
          )}
        </div>
      </div>

      {/* Add Property Modal */}
      <CommonModal
        showModal={showAddPropertyModal}
        handleClose={handleCloseModal}
        title="Add New Property"
        size="xl"
      >
        <AddPropertyForm
          onClose={handleCloseModal}
          onSuccess={handlePropertyCreated}
        />
      </CommonModal>
    </header>
  );
}

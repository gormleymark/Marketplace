import { type ReactElement } from "react";
import css from "./FilterModal.module.css";
import closeIcon from "./closeIcon.svg";
import Image from "next/image";
import SelectCountry from "@/app/components/SelectCountry/SelectCountry";

export function FilterModal({
  setShowModal,
  selectedFilters,
  handleFilterChange,
  handleApplyFilter,
}: any): ReactElement {
  document.body.style.overflow = "hidden";

  const footerElement = document.getElementById("footer");
  const navbarElement = document.getElementById("navbar");

  if (footerElement && navbarElement) {
    footerElement.style.visibility = "hidden";
    navbarElement.style.display = "none";
  }
  const handleCloseModal = () => {
    document.body.style.overflow = "auto";
    if (footerElement && navbarElement) {
      footerElement.style.visibility = "visible";
      navbarElement.style.display = "block";
    }

    setShowModal(false);
  };

  return (
    <div className={css.filterModalContainer}>
      <section className={css.filterModal}>
        <div className={css.filterModalHeader}>
          <h3>Filter</h3>
          <button onClick={handleCloseModal}>
            <Image src={closeIcon} alt="close" />
          </button>
        </div>
        <div className={css.modalFilterList}>
          <div>
            <label htmlFor="location">Location</label>
            <SelectCountry
              currentValue={selectedFilters.location}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label htmlFor="rentalYield">Rental Yield</label>
            <select
              id="rentalYield"
              defaultValue={selectedFilters.rentalYield}
              onChange={(e) =>
                handleFilterChange("rentalYield", e.target.value)
              }
            >
              <option value="">All</option>
              <option value="0-5">Up to 5%</option>
              <option value="5-10">5% to 10%</option>
              <option value="10-25">10% to 25%</option>
            </select>
          </div>
          <div>
            <label htmlFor="financeType">Finance Type</label>
            <select
              id="financeType"
              defaultValue={selectedFilters.financeType}
              onChange={(e) =>
                handleFilterChange("financeType", e.target.value)
              }
            >
              <option value="">All</option>
              <option value="passiveIncome">Passive Income</option>
              <option value="capitalRepayment">Capital Repayment</option>
            </select>
          </div>
        </div>

        <div className={css.filterModalType}>
          <h3>Type</h3>
          <label htmlFor="rental">
            <input type="checkbox" id="rental" />
            <span>Rental</span>
          </label>
          <label htmlFor="rural">
            <input type="checkbox" id="rural" />
            <span>Rural</span>
          </label>
          <label htmlFor="apartament">
            <input type="checkbox" id="apartament" />
            <span>Apartament</span>
          </label>
        </div>
        <button
          className={css.savechanges}
          onClick={() => {
            handleApplyFilter();
            handleCloseModal();
          }}
        >
          Save changes
        </button>
      </section>
    </div>
  );
}

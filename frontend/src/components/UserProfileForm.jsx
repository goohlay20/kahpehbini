import React, {useCallback, useEffect, useState} from "react";
import useFetchData from "../hooks/useFetchData";
import { useForm } from "react-hook-form";
import axios from "axios";
import { emailValidation, requiredValidation, profilePasswordValidation } from "../utility/fieldValidation";
import ErrorMessage from "../utility/ErrorMessage";
import SuccessMessage from "../utility/SuccessMessage";
import WarningMessage from "../utility/WarningMessage";

const UserProfileForm = ({ user }) => {

  const [profile, setProfile]=useState({});
  const [formEditable, setFormEditable] = useState(false);
  const { register, handleSubmit, formState: { errors, isDirty }, reset, trigger } = useForm({ defaultValues: profile });
  const { data: regionList } = useFetchData("https://kahpehbini-api.vercel.app/api/v1/regions");
  const { data: fetchedProfile, refetch: refetchedProfile } = useFetchData(`https://kahpehbini-api.vercel.app/api/v1/users/${user._id}`);
  const createdAt = new Date(profile.createdAt);
  const formattedDate = `${createdAt.toLocaleString('en-US', { month: 'short' })} ${createdAt.getDate()}, ${createdAt.getFullYear()}`;

  const [regions, setRegion] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [errorRegion, setErrorRegion] = useState("");
  const [profileAdd, setProfileAdd] = useState({});

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    let updatedProfile;
      updatedProfile = {
        ...profile,
        [fieldName]: value
      };

    setProfile(updatedProfile);
  }
  
  // Barangay Dropdown
  const handleBarangayChange = useCallback((value, autoFill) => {
    try {
      if (profileAdd && !autoFill) {
        setSelectedBarangay(profileAdd.barangay);
      } else {
        setSelectedBarangay(value);
      }
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  }, [profileAdd]);

  // City Dropdown
  const handleCityChange = useCallback((value, cityArr, autoFill) => {
    try {
      const barangayList = cityArr.filter(city => city.city === value).flatMap(city => city.barangay_list);
      setBarangays(barangayList);
      setSelectedCity(value);

      if (profileAdd && !autoFill) {
        setSelectedBarangay(profileAdd.barangay);
        handleBarangayChange(profileAdd.barangay, autoFill);
      } else {
        setSelectedBarangay(barangayList[0]);
        handleBarangayChange(barangayList[0], autoFill);
      }
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  }, [handleBarangayChange, profileAdd])

  // Province Dropdown
  const handleProvinceChange = useCallback((value, currentRegion, regionsList, autoFill) => {
    try {
      const filteredRegions = regionsList.filter(region => region.region_name === currentRegion);
      if (filteredRegions.length > 0) {
        const provinceList = filteredRegions[0].province_list;

        if (provinceList.hasOwnProperty(value)) {
          const cityList = provinceList[value].municipality_list;
          const cityArr = Object.entries(cityList).map(([city, details]) => ({
            city,
            ...details
          }));

          setCities(cityArr);
          setSelectedProvince(value);
          if (profileAdd && !autoFill) {
            setSelectedCity(profileAdd.city);
            handleCityChange(profileAdd.city, cityArr, autoFill);
          } else {
            setSelectedCity(cityArr[0].city);
            handleCityChange(cityArr[0].city, cityArr, autoFill);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  }, [handleCityChange, profileAdd]);

  // Region Dropdown
  const handleRegionChange = useCallback((value, regionsList, autoFill = false) => {
    try {
      const provinceList =
        regionsList
          .filter(region => region.region_name === value)
          .flatMap(region => Object.keys(region.province_list));

      setProvinces(provinceList);
      setSelectedRegion(value);
      if (profileAdd && !autoFill) {
        setSelectedProvince(profileAdd.province);
        handleProvinceChange(profileAdd.province, value, regionsList, autoFill);
      } else {
        setSelectedProvince(provinceList[0]);
        handleProvinceChange(provinceList[0], value, regionsList, autoFill);
      }
    
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  }, [handleProvinceChange, profileAdd]);

  // Region Validation
  const handleRegionValidation = () => {
    if(!selectedRegion){
      setErrorRegion("Please select a Region")
      return
    }
  }

  // Submit Updated Profile
  const onSubmit = async (input, e) => {
    e.preventDefault();

    // Check if there is no Region selected
    if(!selectedRegion){
      setErrorRegion("Please select a Region");
      return;
    }

    // Check if user made changes
    if (!isDirty && 
      selectedRegion === profileAdd.region && 
      selectedProvince === profileAdd.province && 
      selectedCity === profileAdd.city && 
      selectedBarangay === profileAdd.barangay) {

      setWarningMessage("Nothing to update.");
      handleTimeout("warning");
      return;
    }

    try {
      // Title Case Name
        const fname = input.firstName.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
        const lname = input.lastName.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());


      // Updated profile details
      let updatedProfile = {
        email: input.email,
        fullname: {
          firstName: fname,
          lastName: lname,
        },
        address: {
          address: input.address,
          region: selectedRegion,
          province: selectedProvince,
          city: selectedCity,
          barangay: selectedBarangay,
        }
      }

      // Check if user change the password
      if (input.password !== ""){
        updatedProfile = {
          ...updatedProfile,
          password: input.password,
        }
      }

      // Update the database
      await axios.patch(`https://kahpehbini-api.vercel.app/api/v1/users/${user._id}`, updatedProfile);
      setSuccessMessage("Updated successfully.");
      handleTimeout("success");
      
      const updatedInitData = {
        ...profile,
        password: "",
        firstName: fname,
        lastName: lname,
      };
      setProfile(updatedInitData);
      reset(updatedInitData);

    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'An error occurred updating.');
      handleTimeout("error");
    }

    setFormEditable(false);
    setProfile({...profile, password: ""});
  };

  // Remove error/success message
  const handleTimeout = (messageType) => {
    setTimeout(() => {
      if (messageType === "success") {
        setSuccessMessage("");
      } else if (messageType === "error") {
        setErrorMessage("");
      } else if (messageType === "warning") {
        setWarningMessage("");
      }
    }, 3000);
  };

  // Set the form to be editable
  const handleEditButtonClick = () => {
    setFormEditable(true);
  };

  // Cancel changes
  const handleCancelEdit = async() => {
    refetchedProfile();
    reset();
    setFormEditable(false);
    setProvinces([]);
    setCities([]);
    setBarangays([]);
    setErrorRegion("");
  }

  // Fetch the region collection in database
  useEffect(() => {
    if(profileAdd){
      if (regionList) {
        let regionsList = Object.keys(regionList).map(key => ({
          region_code: key,
          region_name: regionList[key].region_name,
          _id: regionList[key]._id,
          province_list: regionList[key].province_list || {}
        }));

        setRegion(regionsList);
        if(profileAdd.region){
          setSelectedRegion(profileAdd.region);
          handleRegionChange(profileAdd.region, regionsList);
        } else {
          setSelectedRegion("");
        }
        }
    }
  }, [regionList, handleRegionChange, profileAdd]);

  // Fetch the user's data
  useEffect(() => {
      if (fetchedProfile) {
        const userDetails = {
          email: fetchedProfile[0].email,
          password: "",
          firstName: fetchedProfile[0].fullname?.firstName,
          lastName: fetchedProfile[0].fullname?.lastName,
          address: fetchedProfile[0].address?.address,
          createdAt: fetchedProfile[0].createdAt,
         }
         const initAdd = {
          region: fetchedProfile[0].address?.region,
          province: fetchedProfile[0].address?.province,
          city: fetchedProfile[0].address?.city,
          barangay: fetchedProfile[0].address?.barangay,
         }
        setProfile(userDetails);
        setProfileAdd(initAdd);
        reset(initAdd);
        reset(userDetails);
      } 
  }, [fetchedProfile, reset, setProfileAdd]);

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
    <h2 className="font-semibold text-xl text-gray-600">Profile</h2>
    <div className="flex flex-row">
      <SuccessMessage successMessage={successMessage} />
      <ErrorMessage errorMessage={errorMessage} />
      <WarningMessage warningMessage={warningMessage} />
    </div>
    <p className="text-gray-500 mb-6"></p>
    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">

        <div className="lg:col-span-3">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 ">
            <div className="md:col-span-2 pointer-events-none">
              <label htmlFor="userId">UserID</label>
              <input
                type="text"
                readOnly
                name="userId"
                value={user._id || ""}
                id="userId"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-200" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                name="email"
                defaultValue={profile.email || ''}
                id="email"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                disabled={!formEditable}
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", emailValidation("email", handleInputChange, trigger))}
              />
              {errors.email &&
                <ErrorMessage errorMessage={errors.email.message} />
              } 
            </div>

            <div className="md:col-span-1">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="************"
                defaultValue={profile.password || ""}
                id="password"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                disabled={!formEditable}
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", profilePasswordValidation("password", handleInputChange, trigger))}
              />
                {errors.password &&
                  <ErrorMessage errorMessage={errors.password.message} />
                } 
            </div>

            <div className="md:col-span-2">
              <label htmlFor="firstName">First Name</label>
              <input
               type="text"
               name="firstName"
               defaultValue={profile.firstName || ''}
               id="firstName"
               className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
               disabled={!formEditable}
               aria-invalid={errors.firstName ? "true" : "false"}
               {...register("firstName", requiredValidation("firstName", handleInputChange, trigger))}
             />
               {errors.firstName &&
                 <ErrorMessage errorMessage={errors.firstName.message} />
               } 
            </div>

            <div className="md:col-span-2">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                defaultValue={profile.lastName || ""}
                onChange={(e)=>handleInputChange(e.target.value, "lastName")}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                disabled={!formEditable}
                aria-invalid={errors.lastName ? "true" : "false"}
                {...register("lastName", requiredValidation("lastName", handleInputChange, trigger))}
              />
                {errors.lastName &&
                  <ErrorMessage errorMessage={errors.lastName.message} />
                } 
            </div>

            <div className="md:col-span-1 pointer-events-none">
              <label htmlFor="dateCreated">Member Since</label>
              <input
                type="text"
                readOnly
                name="dateCreated"
                id="dateCreated"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-200"
                value={formattedDate || ""}
              />
            </div>

            <div className="md:col-span-5">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="House Nos, Building or Subdivision Name, Street Name"
                defaultValue={profile.address || ""}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                disabled={!formEditable}
                {...register("address", requiredValidation("address", handleInputChange, trigger))}
              />
               {errors.address &&
                  <ErrorMessage errorMessage={errors.address.message} />
                }
            </div>

            <div className="md:col-span-3">
              <label htmlFor="region">Region</label>
              <select
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                name="region"
                label="Select Region"
                value={selectedRegion || ""}
                onChange={(e)=>{
                  setSelectedRegion(e.target.value)
                  handleRegionChange(e.target.value, regions, true)
                  setErrorRegion("");
                }}
                disabled={!formEditable}
              >
                {regions.filter((region) => region.region_name !== undefined).map((region, index) => (
                  <option key={index} value={region.region_name}>{region.region_name}</option>
                ))}
              </select>
              {errorRegion &&
                  <ErrorMessage errorMessage={errorRegion} />
                }
            </div>

            <div className="md:col-span-2">
              <label htmlFor="province">Province</label>
              <select
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                name="province"
                label="Select Province"
                value={selectedProvince || ""}
                onChange={(e)=>{
                  setSelectedProvince(e.target.value)
                  handleProvinceChange(e.target.value, selectedRegion, regions, true)
                }}
                disabled={!formEditable}
              >
                {
                  provinces.map((province, index) => (
                    <option key={index} value={province}>{province}</option>
                  ))
                }
              </select>
              {errorRegion &&
                  <ErrorMessage errorMessage="Please select a Province" />
                } 
            </div>

            <div className="md:col-span-2">
              <label htmlFor="city">Municipality / City</label>
              <select
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                name="city"
                label="Select City"
                value={selectedCity || ""}
                onChange={(e)=>{
                  setSelectedCity(e.target.value)
                  handleCityChange(e.target.value, cities, true)
                }}
                disabled={!formEditable}
              >
                {cities.map((city, index) => (
                  <option key={index} value={city.city}>{city.city}</option>
                ))}
              </select>
              {errorRegion &&
                  <ErrorMessage errorMessage="Please select a City" />
                } 
            </div>

            <div className="md:col-span-2">
              <label htmlFor="barangay">Baranggay</label>
              <select
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                name="barangay"
                label="Select Barangay"
                value={selectedBarangay || ""}
                onChange={(e)=>{
                  setSelectedBarangay(e.target.value)
                  handleBarangayChange(e.target.value, barangays, true)
                }}
                disabled={!formEditable}
              >
                {barangays.map((barangay, index) => (
                  <option key={index} value={barangay}>{barangay}</option>
                ))}
              </select>
              {errorRegion &&
                  <ErrorMessage errorMessage="Please select a Barangay" />
                } 
            </div>

            {/* <div className="md:col-span-1 pointer-events-none">
              <label htmlFor="zipcode">Zipcode</label>
              <input
                type="text"
                readOnly
                //Class
                //pointer-events-none
                name="zipcode"
                id="zipcode"
                className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-200"
                placeholder=""
                value={profile.address?.zipCode || ""}
                onChange={(e)=>handleInputChange(e.target.value, "zipCode", "address")}
                disabled={!formEditable}
              />
            </div> */}

            <div className="md:col-span-1 hover:bg mt-2 ">
              { !formEditable && 
                <button className="h-10 rounded mt-3 text-white font-bold bg-green-500 mx-1 w-full"
                onClick={handleEditButtonClick}>
                  Edit
                </button>
              }
              { formEditable &&
                <div className="flex">
                  <button 
                    className="h-10 rounded mt-3 text-white font-bold bg-red-500 mx-1 w-1/2"
                    onClick={handleCancelEdit}>
                    Cancel
                  </button>
                  <button
                    className="h-10 rounded mt-3 text-white font-bold bg-green-500 mx-1 w-1/2"
                    type="submit" onClick={handleRegionValidation}>
                    Save
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
  )
}

export default UserProfileForm;
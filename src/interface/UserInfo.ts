interface UserInfoProps {
  username: string;
  name: string;
  // dob: CalendarDate | undefined;
  address: string;
  job: string;
  gender: string;
  disease: boolean;
  treatment: string;
  surgery: boolean;
  surgeryType: string;
  isToxic: boolean;
  isEpidemic: boolean;
  isGeneticDisease: boolean;
  isSmoke: boolean;
  isExercise: boolean;
  avatar: string;
}

export default UserInfoProps;

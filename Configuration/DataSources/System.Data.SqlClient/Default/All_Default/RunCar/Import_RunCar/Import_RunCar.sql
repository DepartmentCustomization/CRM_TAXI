Insert into dbo.Import_RunCar (
                car_id,
				run_km
				)
	Values (
	       (select Id from Cars where cars_name = @car),
			@run_km
			)
			----------
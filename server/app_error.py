class AppError(Exception):
	def __init__(self, message):
		self.message = message
		self.status = 500